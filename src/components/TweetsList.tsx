import { Heart, MessageCircle } from 'lucide-react';

interface Tweet {
  id: string;
  author: string;
  content: string;
  likes: number;
  retweets: number;
}

interface TweetsListProps {
  tweets: Tweet[];
}

const TweetsList = ({ tweets }: TweetsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Principais Tweets de Engajamento:
      </h3>
      
      <div className="space-y-3">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id}
            className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-2">
              <p className="text-card-foreground text-sm leading-relaxed">
                "{tweet.content}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-medium text-sm">
                  {tweet.author}
                </span>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{tweet.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    <span>{tweet.retweets}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetsList;