import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {motion} from "framer-motion"

const GenerateText = () => {
    const [keyword, setKeyword] = useState('');
    const [task, setTask] = useState('Shayari');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState('');

    const generate = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/generate`, {keyword, task})
            setText(response.data);
        } catch (error) {
            console.error(`Error generating ${task}: ${error.message}`);
            setError(`Error generating ${task}`);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <motion.div
        initial={{opacity: 0, u: -20}}
        animate={{opacity : 1, y : 0}}
        transition={{duration : 0.5}}
    >
        <Box p="4" bg="whitesmoke"  bgGradient="linear(to right, #48b1bf, #06beb6)" h="100vh">
            <Box borderWidth={'1px'} borderRadius={'md'} w="50%" m="auto" p="5" bg="white" boxShadow={'lg'}>
                <Heading textAlign={'center'} mb="10">Generate {task}</Heading>
                <FormControl mb="5">
                    <Input type="text" placeholder='Enter Text' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>                
                </FormControl>
                <FormControl>
                    <FormLabel>What do you want to generate: </FormLabel>
                    <Select value={task} onChange={(e) => setTask(e.target.value)}>
                    <option value="Shayari">Shayari</option>
                    <option value="Jokes">Jokes</option>
                    <option value="Story">Story</option>
                    <option value="Quote">Quote</option>
                    </Select>
                </FormControl>
                <Box textAlign={'center'}>
                    <Button colorScheme='teal' w="full" mt="4" fontSize={'2xl'} p="6" onClick={generate}>Generate</Button>
                </Box>
                {
                    isLoading ? (
                        <Box mt="5" textAlign={'center'}>
                            <Spinner size="lg" color="teal"/>
                        </Box>
                    ) : error ? (
                        <Box mt="2" textAlign={'center'} color="red.500">
                            <Text>{error}</Text>
                        </Box>
                    ) : (
                        <Box p="2" borderWidth="1px" borderRadius="md" mt="2" overflow={'auto'} maxHeight={'320px'}>
                            <pre><Text style={{textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', fontSize: '20px'}}>{text}</Text></pre>
                        </Box>
                    )
                }     
            </Box>
        </Box>
    </motion.div>
  )
}

export default GenerateText