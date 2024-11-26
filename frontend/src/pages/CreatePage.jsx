import React, { useState } from 'react'
import { Box, Text, Input, Button, VStack, FormControl, FormLabel, useColorModeValue, useToast } from '@chakra-ui/react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  })
  
  const { createProduct } = useProductStore()

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const handleAddProduct = async() => {
    try {
      setIsLoading(true)
      const {success, error} = await createProduct(newProduct)
      if (success) {
        toast({
          title: 'Success!',
          description: 'The product has been created',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
        setNewProduct({ name: '', price: '', image: '' })
      } else {
        toast({
          title: 'Error!',
          description: error || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        })
      }
    } catch (err) {
      toast({
        title: 'Error!',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    } finally {
      setIsLoading(false)
    }
  };
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const inputBg = useColorModeValue('white', 'whiteAlpha.200')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box maxW={"1140px"} mx={"auto"} py={10}>
      <Box 
        p={8} 
        borderWidth={1} 
        borderRadius="lg" 
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <Text fontSize={"4xl"} fontWeight={"bold"} textAlign="center">Create New Product</Text>
          
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input 
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name" 
              borderColor={borderColor}
              _hover={{ borderColor: 'gray.400' }}
              bg={inputBg}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input 
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              type="number" 
              placeholder="Enter price" 
              borderColor={borderColor}
              _hover={{ borderColor: 'gray.400' }}
              bg={inputBg}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input 
              name="image"
              value={newProduct.image} 
              onChange={handleInputChange}
              placeholder="Enter image URL" 
              borderColor={borderColor}
              _hover={{ borderColor: 'gray.400' }}
              bg={inputBg}
            />
          </FormControl>

          <Button 
            isLoading={isLoading} 
            onClick={handleAddProduct} 
            colorScheme="blue" 
            size="lg"
          >
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default CreatePage