import { Box, useColorModeValue } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { useProductStore } from './store/product'
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

function App() {
  const { products } = useProductStore()
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.200", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App
