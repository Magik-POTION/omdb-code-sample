import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Image,
  // useWindowDimensions,
  // Platform,
} from "react-native";

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  Divider,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import OMDBMovie from "./interfaces/OMDBMovie";
import { Search } from "@mui/icons-material";
import MoviesManger from "./singletons/MoviesManger";
import AppStatus from "./singletons/AppStatus";
import OMDB from "./services/OMDB";

const title = "OMDB";
const results = "Search Results";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  searchBar: {
    flex: 1,
  },
  movieList: {
    flex: 1,
  },
  card: {
    margin: 4,
    width: window.innerWidth * 0.45,
  },
  columnWrapper: {
    justifyContent: "center",
  },
  cardMedia: {
    height: window.innerWidth * 0.675,
  },
});

function renderMovie({
  item,
  index,
  separators,
}: {
  item: OMDBMovie;
  index: number;
  separators: any;
}) {
  return (
    <Card style={styles.card}>
      <CardMedia
        component={Image}
        source={{ uri: item.Poster }}
        style={styles.cardMedia}
        resizeMode="contain"
      />
      <CardContent>
        <Typography variant="subtitle1" noWrap>
          {item.Title}
        </Typography>
        <Typography variant="subtitle2">{item.Year}</Typography>
      </CardContent>
      <CardActions>
        <Button>Action</Button>
      </CardActions>
    </Card>
  );
}

async function onChangeSearch(event: any) {
  try {
    AppStatus.isLoading = true;

    const data = await OMDB.searchForMovie(event.target.value);

    MoviesManger.movies = data.Search ? data.Search : [];

    AppStatus.isLoading = false;
  } catch (e) {
    MoviesManger.movies = [];

    AppStatus.isLoading = false;
  }
}

function keyExtractor(item: OMDBMovie, index: number) {
  return item.imdbID;
}

function ListEmptyComponent() {
  return <Typography textAlign="center">No Results</Typography>;
}

function ListHeaderComponent() {
  return (
    <Paper square variant="outlined">
      <Typography textAlign="center" variant="h5">
        {results}
      </Typography>
    </Paper>
  );
}

function ItemSeparator() {
  return <Divider />;
}

export default function App() {
  const [movies, setMovies] = useState<Array<OMDBMovie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const moviesSubscription = MoviesManger.subscribeToMovies(setMovies);
    const isLoadingSubscription = AppStatus.subscribeToIsLoading(setIsLoading);

    return () => {
      if (moviesSubscription) moviesSubscription.unsubscribe();
      if (isLoadingSubscription) isLoadingSubscription.unsubscribe();
    };
  }, []);



  return (
    <View style={styles.view}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
            <IconButton disabled>
              <Search />
            </IconButton>

            <TextField
              style={styles.searchBar}
              placeholder="Search Movies"
              onChange={onChangeSearch}
              size="small"
            />
          </Toolbar>
        </AppBar>
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
          style={styles.movieList}
          data={movies}
          renderItem={renderMovie}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={keyExtractor}
          ListEmptyComponent={isLoading ? null : ListEmptyComponent}
          ListFooterComponent={
            <ActivityIndicator animating={isLoading} size="large" />
          }
          ItemSeparatorComponent={ItemSeparator}
        />
      </ThemeProvider>
    </View>
  );
}
