import { Component, OnInit } from '@angular/core';
import { TweetsService } from 'src/services/tweets.service';
import { Tweets } from 'src/models/tweets.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  public tweetCount = null;
  public displayedColumns: string[] = ['tweet', 'party'];
  public tweetData: Tweets[];
  public tweetHandle = new FormControl('');

  constructor(
    private tweetsService: TweetsService
  ) { }

  ngOnInit() {

    this.tweetHandle.valueChanges
      .subscribe(name => {
        if (!name) {
          this.tweetData = [];
        }
    });

    this.tweetsService.getTweetCount()
    .subscribe(data => {
      if (data.recordCount > 0) {
        this.tweetCount = data.recordCount;
      } else {
        this.tweetCount = null;
      }
    });
  }

  public searchUserTweets(): void {
    if (this.tweetHandle.value) {
      this.tweetsService.getUserTweets(this.tweetHandle.value)
      .subscribe(tweets => {
        this.tweetData = tweets;
      });
    }
  }

  public loadMoreTweets(): void {
    // eventually grab and put more tweets in db
  }
}
