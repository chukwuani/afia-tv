import type { Article, SectionData } from '../types';

export const recommendedArticles: Article[] = [
  {
    id: '1',
    title: 'How the U.S. Lost the Canadian Election',
    excerpt: "Trump's threats to annex Canada reversed its political trend—but they should not reverse its commitment to free trade.",
    author: 'DAVID FRUM',
    image: {
      src: '/images/canadian-flag.jpg',
      credit: 'Ethan Soope / Bloomberg / Getty'
    }
  },
  {
    id: '2',
    title: 'The Great Language Flattening',
    excerpt: "Chatbots learned from human writing. Now it's their turn to influence us.",
    author: 'VICTORIA TURK',
    image: {
      src: '/images/language-collage.jpg',
      credit: 'Illustration by Cecilia Erlich'
    }
  }
];

export const archiveArticles: Article[] = [
  {
    id: '3',
    title: 'Pitchers and Catchers',
    excerpt: "\"Good fielding and pitching, without hitting, or vice versa, is like Ben Franklin's half a pair of scissors — ineffectual. Twenty-game winners or .400 hitters do not ensure victory.\" (From 1941)",
    author: 'MOE BERG',
    image: {
      src: '/images/baseball-catcher.jpg',
      credit: 'Associated Press'
    }
  },
  {
    id: '4',
    title: 'Harvard and the Making of the Unabomber',
    excerpt: "A series of purposely brutalizing psychological experiments may have confirmed Theodore Kaczynski's still-forming belief in the evil of science while he was in college. (From 2000)",
    author: 'ALSTON CHASE',
    image: {
      src: '/images/kaczynski.jpg',
      credit: 'John Youngbear / AP'
    }
  }
];

export const magazineSections: SectionData[] = [
  {
    title: 'RECOMMENDED FOR YOU',
    articles: recommendedArticles
  },
  {
    title: 'ARCHIVE',
    articles: archiveArticles
  }
];
