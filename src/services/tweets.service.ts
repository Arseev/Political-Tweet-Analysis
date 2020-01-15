import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tweets } from 'src/models/tweets.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private  url = 'http://politicaltweettemperature.com/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'c31z' })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getTweetCount(): Observable<any> {
    const headers = new HttpHeaders();
    const URL = 'http://politicaltweettemperature.com/api/getRecordCount.php';
    return this.http.get(URL, this.httpOptions)
      .pipe(catchError(() => 'failed to get tweet count'));
  }

  public getUserTweets(userName: string): Observable<any> {
    const URL = 'http://politicaltweettemperature.com/searchUser.php?user=' + userName;
    return this.http.get(URL, this.httpOptions)
      .pipe(catchError(() => 'failed to get tweets for ' + userName));
  }

  public getWordWeights(): Observable<any> {
    const URL = 'http://poloticaltweettemperature.com/getWordWeights.php';
    return this.http.get(URL, this.httpOptions)
      .pipe(catchError(() => 'failed to get word weights'));
  }

  public analyzeUserTweets(userName: string): Observable<any> {
    const URL = 'http://politicaltweettemperature.com/analyzeUser.php?user=' + userName;
    return this.http.get(URL, this.httpOptions)
      .pipe(catchError(() => 'failed to analyze tweets for ' + userName));
  }

  public loadMoreTweetsForModel(): Observable<boolean> {
    const URL = 'http://politicaltweettemperature.com/getAllTweets.php';
    return this.http.get<boolean>(URL);
  }
}
