import { Component, OnInit, ViewChild } from '@angular/core';
import { TweetsService } from 'src/services/tweets.service';
import { Tweets } from 'src/models/tweets.model';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  public tweetCount = null;
  public displayedColumns: string[] = ['tweet', 'party'];
  public tweetData: Tweets[];
  private unsubscribe$: Subject<boolean>;
  private wordWeights: any[];

  public tweetHandle = new FormControl('');
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(
    private tweetsService: TweetsService
  ) { }

  ngOnInit() {

    this.tweetHandle.valueChanges
      .subscribe(name => {
        // Clear results if name cleared on page
        if (!name) {
          this.tweetData = [];
        }
    });

    this.updateTweetCount();
  }

  public updateTweetCount(): void {
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
    const newTweetArray = [];
    if (this.tweetHandle.value) {
      const getUserTweetsObs = this.tweetsService.getUserTweets(this.tweetHandle.value);
      const getAllWordWeights = this.tweetsService.getWordWeights();
      getAllWordWeights.subscribe(
        data => {
          this.wordWeights = data;
        },
        () => {
          getUserTweetsObs.pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            let count = 0;
            const tweets = data.statuses;
            tweets.forEach(tweet => {
              if (count <= 10) {
                const newTweet = new Tweets(tweet.text, this.tweetHandle.value);
                newTweetArray.push(newTweet);
              }
              count++;
            });
            this.tweetData = newTweetArray;
            this.table.renderRows();
          });
        });
    }
  }

  public loadMoreTweets(): void {
    this.tweetsService.loadMoreTweetsForModel();
    this.updateTweetCount();
  }
}
