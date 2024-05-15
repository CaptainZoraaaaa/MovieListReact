import filled from '../assets/Star_full.png';
import { Card, Img, HStack, Flex, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'

// stars: the rating the movie got
// name: Title / name of the movie
// Id: is the id of this component to keep track of all children
// removeMovie: The method from the parent class that removes this component 
function MovieCard({ stars, name, id, removeMovie }) {
  // retrurns an image for each star (rating) the movie got
  const getStars = () => {
    const temp = [];
    for (let i = 0; i < stars; i++) {
      temp.push(<Img key={i} src={filled} maxH={'40px'} maxW={'5%'} />)
    }
    return temp;
  }
  return (
    <Card  height={'100%'} width={'100%'} padding={'1%'}>
      <HStack>
        <Flex height={'100%'} width={'100%'} alignItems={'center'}>
          {name}
        </Flex>
        {getStars()}
        <IconButton onClick={() => removeMovie(id)} color={'red'} icon={<CloseIcon />}></IconButton>
      </HStack>
    </Card>
  )
}

export default MovieCard
