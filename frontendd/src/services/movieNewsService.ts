import { gql } from '@apollo/client';
import client from '@src/config/yeni-client';

// GraphQL queries
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      release_date
      plot_summary
      poster_url
      duration_minutes
      movieq_rating
      imdb_rating
      genres { id name }
    }
  }
`;

const GET_NEWS = gql`
  query GetNews($limit: Int) {
    newsArticles(limit: $limit, offset: 0, sortBy: "published_at", sortOrder: "DESC") {
      id
      title
      short_content
      image_url
      published_at
    }
  }
`;

// Query for MoviesPage (using existing backend 'movies' query)
const GET_MOVIES_PAGE_QUERY = gql`
  query GetMoviesPage(
    $filter: MovieFilterInput
    $sortBy: MovieSortBy
    $search: String
    $limit: Int
    $offset: Int
  ) {
    movies(
      filter: $filter
      sortBy: $sortBy
      search: $search
      limit: $limit
      offset: $offset
    ) {
      id
      title
      slug
      plot_summary
      release_date
      duration_minutes
      poster_url
      movieq_rating
      imdb_rating
      genres {
        id
        name
      }
      cast(limit: 3) {
        person {
          id
          name
          slug
        }
        character_name
      }
      crew(limit: 3) {
        person {
          id
          name
          slug
        }
        job
        department
      }
    }
  }
`;

const GET_MOVIES_PAGE_COUNT_QUERY = gql`
  query GetMoviesPageCount($filter: MovieFilterInput, $search: String) {
    movieCount(filter: $filter, search: $search)
  }
`;

const GET_ALL_GENRES_QUERY = gql`
  query GetAllGenres {
    genres(limit: 100, isCollection: false) {
      id
      name
      slug
    }
  }
`;

// --- Queries for RecPage ---
const GET_RANDOM_MOVIES = gql`
  query GetRandomMovies($limit: Int) {
    randomMovies(limit: $limit) {
      id
      title
      release_date
      plot_summary
      poster_url
      duration_minutes
      movieq_rating
      genres {
        id
        name
      }
    }
  }
`;

const GET_RECOMMENDATION_SECTIONS = gql`
  query GetPublicRecommendationSections($activeOnly: Boolean, $limitSections: Int, $offsetSections: Int, $limitMoviesPerSection: Int) {
    publicRecommendationSections(activeOnly: $activeOnly, limit: $limitSections, offset: $offsetSections) {
      id
      title
      section_type
      description
      movies(limit: $limitMoviesPerSection) {
        id
        title
        release_date
        poster_url
        movieq_rating
        genres { id name } 
      }
    }
  }
`;

// Types
export interface Movie {
  id: string;
  title: string;
  release_date: string | null;
  plot_summary: string | null;
  poster_url: string | null;
  duration_minutes: number | null;
  movieq_rating: number | null;
  imdb_rating: number | null;
  genres: { id: string; name: string }[] | null;
  cast?: { person: { id: string; name: string; slug?: string | null; }; character_name: string | null; }[] | null;
  crew?: { person: { id: string; name: string; slug?: string | null; }; job: string | null; department: string | null; }[] | null;
  published_at: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  short_content: string | null;
  image_url: string | null;
  published_at: string | null;
}

export interface NewsArticleDetail extends NewsItem {
  content: string;
  author?: {
    id: string;
    username: string;
  } | null;
  movies?: Movie[];
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface MoviesPageParams {
  filter?: any;
  sortBy?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface PublicRecommendationSection {
  id: string;
  title: string;
  section_type: string;
  description: string | null;
  movies: Movie[];
}

// Service functions
export const getMovies = async (): Promise<Movie[]> => {
  const { data, errors } = await client.query<{ movies: Movie[] }>({
    query: GET_MOVIES,
    fetchPolicy: 'network-only',
  });
  if (errors) throw new Error(errors.map(e => e.message).join('\n'));
  return data.movies;
};

export const getNews = async (limit?: number): Promise<NewsItem[]> => {
  const { data, errors } = await client.query<{ newsArticles: NewsItem[] }>({
    query: GET_NEWS,
    variables: { limit },
    fetchPolicy: 'network-only',
  });
  if (errors) {
    console.error('GraphQL Errors fetching news:', errors);
    throw new Error(errors.map(e => e.message).join('\n'));
  }
  return data.newsArticles;
};

export const getMoviesForPage = async (params: MoviesPageParams): Promise<Movie[]> => {
  const { data, errors } = await client.query<{ movies: Movie[] }>({
    query: GET_MOVIES_PAGE_QUERY,
    variables: params,
    fetchPolicy: 'network-only',
  });
  if (errors) {
    console.error('GraphQL Errors fetching movies for page:', errors);
    throw new Error(errors.map(e => e.message).join('\n'));
  }
  return data.movies || [];
};

export const getMoviesPageCount = async (params: { filter?: any; search?: string }): Promise<number> => {
  const { data, errors } = await client.query<{ movieCount: number }>({
    query: GET_MOVIES_PAGE_COUNT_QUERY,
    variables: params,
    fetchPolicy: 'network-only',
  });
  if (errors) {
    console.error('GraphQL Errors fetching movies page count:', errors);
    throw new Error(errors.map(e => e.message).join('\n'));
  }
  return data.movieCount || 0;
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const { data, errors } = await client.query<{ genres: Genre[] }>({
    query: GET_ALL_GENRES_QUERY,
    fetchPolicy: 'cache-first',
  });
  if (errors) {
    console.error('GraphQL Errors fetching all genres:', errors);
    throw new Error(errors.map(e => e.message).join('\n'));
  }
  return data.genres || [];
};

export const getRandomMoviesForRecPage = async (limit: number = 18): Promise<Movie[]> => {
  try {
    const { data, errors } = await client.query<{ randomMovies: Movie[] }>({
      query: GET_RANDOM_MOVIES,
      variables: { limit },
      fetchPolicy: 'network-only',
    });
    if (errors) {
      console.error('GraphQL Errors fetching random movies:', errors);
      throw new Error(errors.map(e => e.message).join('\n'));
    }
    return data.randomMovies || [];
  } catch (error) {
    console.error('Error in getRandomMoviesForRecPage service:', error);
    throw error;
  }
};

export const getRecommendationSections = async (
  activeOnly: boolean = true,
  limitSections: number = 10,
  offsetSections: number = 0,
  limitMoviesPerSection: number = 6
): Promise<PublicRecommendationSection[]> => {
  try {
    const { data, errors } = await client.query<{ publicRecommendationSections: PublicRecommendationSection[] }>({
      query: GET_RECOMMENDATION_SECTIONS,
      variables: { activeOnly, limitSections, offsetSections, limitMoviesPerSection },
      fetchPolicy: 'network-only',
    });
    if (errors) {
      console.
