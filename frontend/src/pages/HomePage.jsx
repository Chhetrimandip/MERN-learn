import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Box, 
  SimpleGrid, 
  Text, 
  Button, 
  Image, 
  VStack, 
  Heading, 
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'

const HomePage = () => {
  const { products, getProducts, deleteProduct, updateProduct } = useProductStore()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)

  // For edit modal
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    image: ''
  })

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setEditForm({
      name: product.name,
      price: product.price,
      image: product.image
    })
    onOpen()
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { success, error } = await deleteProduct(productId)
      
      toast({
        title: success ? 'Success!' : 'Error!',
        description: success ? 'Product deleted successfully' : error,
        status: success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  }

  const handleUpdate = async () => {
    const { success, error } = await updateProduct(selectedProduct._id, editForm)
    
    if (success) {
      toast({
        title: 'Success!',
        description: 'Product updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      onClose()
    } else {
      toast({
        title: 'Error!',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        await getProducts()
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Loading...</Text>
      </Box>
    )
  }

  if (!products?.length) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <VStack spacing={4}>
          <Text fontSize="xl">
            There are no products currently. Would you like to add one?
          </Text>
          <Button
            as={Link}
            to="/create"
            colorScheme="blue"
          >
            Create a product
          </Button>
        </VStack>
      </Box>
    )
  }

  return (
    <>
      <Box maxW="1140px" mx="auto" py={10} px={4}>
        <Heading 
          mb={8} 
          display="flex" 
          alignItems="center" 
          gap={2}
        >
          Current Products 
          <span role="img" aria-label="rocket">🚀</span>
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {products.map((product) => (
            <Box
              key={product._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              boxShadow="md"
            >
              <Image
                src={product.image}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <VStack mt={4} spacing={2} align="start" width="100%">
                <Heading size="md">{product.name}</Heading>
                <Text fontSize="xl" fontWeight="bold">
                  ${product.price}
                </Text>
                <HStack spacing={2} width="100%" pt={2}>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    flex={1}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    flex={1}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="image"
                  value={editForm.image}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HomePage