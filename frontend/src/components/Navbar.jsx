import { Text, Container, Flex, HStack, Button, useColorMode} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { products } = useProductStore()
  return (
    <Container maxW={"1140px"} px={4}>  
      <Flex justifyContent={"space-between"} alignItems={"center"} py={4} flexDir={{base: "column", sm: "row"}}>
        <Text 
          bgGradient="linear(to-l, #7928CA, #FF0080)" 
          bgClip="text" 
          fontSize="6xl" 
          fontWeight="extrabold"
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          <Link to="/">Product Store 🛒 </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={"20px"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
             {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar