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

  public getUserTweets(userName: string): Observable<Tweets[]> {
    const URL = 'http://gettweets.com';
    console.log(userName);
    console.log('this');

    // mock data
    const tweetData = [
      {tweet: 'This is a test tweet1', party: 'Democrat'},
      {tweet: 'This is a test tweet2', party: 'Democrat'},
      {tweet: 'This is a test tweet3', party: 'Republican'},
      {tweet: 'This is a test tweet4', party: 'Republican'},
      {tweet: 'This is a test tweet5', party: 'Democrat'},
      {tweet: 'This is a test tweet6', party: 'Democrat'},
      {tweet: 'This is a test tweet7', party: 'Republican'}
    ];
    return of(tweetData);
  }

  public loadMoreTweetsForModel(): Observable<boolean> {
    const URL = 'http://politicaltweettemperature.com/getAllTweets.php';
    return this.http.get<boolean>(URL);
  }
}
