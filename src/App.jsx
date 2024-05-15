import { useState} from 'react'
import empty from './assets/starE.png'
import filled from './assets/Star_full.png'
// Importing components from component Library chakra-Ui can be found at: https://v2.chakra-ui.com/
import { Button, Card, Flex, HStack, VStack, Img, Input, Stack, useToast, Heading, Divider } from '@chakra-ui/react'
//moviecard component created to display the added movies
import MovieCard from './Components/MovieCard'

function App() {
  // UseStates to keep track of states such as what stars have been 
  // clicked what is the current name written what cards(movies) have been added 
  const [idCount, setIdCount] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [validName, setValidName] = useState(false);
  const [starsImg, setStarsImg] = useState([empty, empty, empty, empty, empty]);
  const [starsValue, setStarsValue] = useState(0);
  const [movieCards, setMovieCards] = useState([]);
  const toast = useToast()

  //changes the rating by looking at the value of imgIndex
  const changeRating = (imgIndex) => {
    const tempArray = [...starsImg]
    for (let index = 0; index <= starsImg.length; index++) {

      if (index <= imgIndex) {
        tempArray[index] = filled;
      } else {
        tempArray[index] = empty;
      }
    }
    setStarsValue(imgIndex + 1);
    setStarsImg(tempArray);
  }
  // controls so the name and rating have been succefully 
  // given and if yes add a new movie otherwise send an error message
  const addMovie = () => {
    if (!nameValue) {
      setValidName(true);
      return toast({
        title: 'No Name Given',
        description: "You must give a name",
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    }
    if (starsValue < 1) {
      return toast({
        title: 'No Rating Given',
        description: "You must give a rating by pressing a star",
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    }
    setValidName(false);
    const tempCards = [...movieCards, { id: idCount, name: nameValue, stars: starsValue }];
    setIdCount(idCount + 1);
    setMovieCards(tempCards);
    resetForm();
  }

  //resets the form after a successfull submit
  const resetForm = () => {
    setNameValue("");
    setStarsImg([empty, empty, empty, empty, empty]);
    setStarsValue(0);
  }
  // removes a movie by the id sent
  const removeMovie = (id) => {
    const tempMovies = movieCards.filter((movie) => movie.id !== id);
    setMovieCards(tempMovies);
  }
  // sorts the movies by the hgiher rating using the sort method
  const sortByRating = () =>{
    const tempArray = [...movieCards];
    tempArray.sort((a,b) => b.stars - a.stars);
    setMovieCards(tempArray);
  }
  // sorts the movies by alphabetical order returns -1,0 or 1
  // -1 means the string is going before the compareString
  // 0 nothing happens 
  // 1 compareString is moved infront of the string
  const sortByName = () =>{
    const tempArray = [...movieCards];
    tempArray.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    setMovieCards(tempArray);
  }

  // Website strcuture All components are returned in a card surounding everything
  // Hstack used to align stars horizontally 
  // VStack Used to display all movieCards vertcally 
  return (
    <Card height={'97svh'} bgColor={'#5EAD90'} padding={'3%'} overflowY={'scroll'}>
      <Stack spacing={'8px'} width={'100%'} alignItems={'center'}>
        <HStack justifyContent="space-between" width={'40%'}>
          <Img src={starsImg[0]} maxH={'40px'} onClick={() => changeRating(0)}></Img>
          <Img src={starsImg[1]} maxH={'40px'} onClick={() => changeRating(1)}></Img>
          <Img src={starsImg[2]} maxH={'40px'} onClick={() => changeRating(2)}></Img>
          <Img src={starsImg[3]} maxH={'40px'} onClick={() => changeRating(3)}></Img>
          <Img src={starsImg[4]} maxH={'40px'} onClick={() => changeRating(4)}></Img>
        </HStack>
        <Input variant='flushed' isInvalid={validName} placeholder='Movie Name'  _placeholder={{color: 'aliceBlue' }} width={'45%'} value={nameValue} onChange={(e) => { setNameValue(e.target.value)}} />
        <Flex width={'45%'}>
          <Button onClick={() => addMovie()}>submit</Button>
        </Flex>
        <Button onClick={()=>{sortByRating()}}>Sort By Rating</Button>
        <Button onClick={()=>{sortByName()}}>Sort By Name</Button>
        <Heading color={'aliceblue'}>Movies</Heading>
        <Divider/>
        <VStack width={'45%'}>
          {movieCards.map((movie) => (
            <MovieCard key={movie.id} id={movie.id} removeMovie={removeMovie} stars={movie.stars} name={movie.name} />
          ))}
        </VStack>
      </Stack>
    </Card>
  )
}
// exports the website with its function as a whole package
export default App
