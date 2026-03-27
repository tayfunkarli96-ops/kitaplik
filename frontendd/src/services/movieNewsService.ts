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
      cast(limit: 3) { # Fetch a few actors
        person {
          id
          name
          slug
        }
        character_name
      }
      crew(limit: 3) { # Fetch a few crew members, filter for directors later
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
    movieCount(filter: $filter, search: $search) # Matches backend query
  }
`;

const GET_ALL_GENRES_QUERY = gql`
  query GetAllGenres {
    genres(limit: 100, isCollection: false) { # Fetching non-collection genres
      id
      name
      slug # slug is available on backend Genre type
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
      genres { # Assuming MovieCard4 needs genres
        id
        name
      }
      # Add any other fields from backend Movie type that MovieCard4 might need
    }
  }
`;

const GET_RECOMMENDATION_SECTIONS = gql`
  query GetPublicRecommendationSections
