import { DocumentCreatorContext } from '@/utils/context/DocumentCreatorContext';
import {
  useDisclosure,
  Text,
  Box,
  useColorModeValue,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Stack,
  BoxProps,
  CloseButton,
  FlexProps,
  Icon,
  IconButton,
  Link,
  chakra,
  Heading,
  Button,
  Input,
  HStack,
  VStack,
} from '@chakra-ui/react';

import React, { ReactText, useContext, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IconType } from 'react-icons';
import {
  FiCompass,
  FiHome,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const documentCreatorContext = useContext(DocumentCreatorContext);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY="scroll"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
          Tradetrust PoC by Marketsurf
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Droppable droppableId="ocr-content">
        {(provided) => (
          <>
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              id="ocr-content"
            >
              <VStack align="stretch" px={3}>
                {documentCreatorContext.content.map((item, index) => (
                  <Draggable
                    index={index}
                    draggableId={`${index}`}
                    key={`ocr-content-${index}`}
                  >
                    {(provided) => (
                      <Box
                        py={2}
                        px={3}
                        bg="gray.800"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Text fontSize="md">{item}</Text>
                      </Box>
                    )}
                  </Draggable>
                ))}
              </VStack>
            </Box>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

const DocumentCreator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [generatedJSON, setGeneratedJSON] = useState(false);
  const [json, setJSON] = useState('');
  // Context
  const documentCreatorContext = useContext(DocumentCreatorContext);

  const [formValues, setFormValues] = useState([{ key: '', value: '' }]);

  // Handle button click. Create new form fields
  const handleButtonClick = () => {
    setFormValues([...formValues, { key: '', value: '' }]);
  };

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileUploaded, 'UTF-8');
    fileReader.onload = (evt) => {
      const fileContent = evt.target?.result ?? '';

      if (fileContent) {
        // try to parse fileContent as json. if fails, output
        // error message
        try {
          const parsedFileContent = JSON.parse(fileContent);
          // get the forms key
          const properties = parsedFileContent.forms[0].schema.properties;
          const keys = Object.keys(properties);
          const formValues = keys.map((key) => ({ key, value: '' }));
          setFormValues(formValues);
        } catch (e) {
          console.log(e);
        }
      }
    };
  };

  return (
    <Box>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;

          if (!destination) return;

          if (source.droppableId) {
            if (source.droppableId === 'ocr-content') {
              // take the data of the source and change the input value to the destination
              console.log(source.index, destination.index);
              console.log(destination);
              const newContent = [...formValues];

              // Extract number from a string
              const extractNumber = (str: string) => {
                const number = str.match(/\d+/g);
                return number ? parseInt(number[0]) : 0;
              };

              const destinationIndex = extractNumber(destination.droppableId);

              newContent[destinationIndex] = {
                key: newContent[destinationIndex].key,
                value: documentCreatorContext.content[source.index],
              };

              setFormValues(newContent);
            }
          }
        }}
      >
        {/* Sidebar */}
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: 'none', md: 'block' }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {/* generate form dynamically */}
            <Heading>Create the data</Heading>
            <HStack>
              <Button onClick={handleButtonClick}>
                <Text>Add a new field</Text>
              </Button>
              <Text>Or</Text>
              <Button onClick={handleClick}>Upload Config File</Button>
              <chakra.input
                accept="application/json"
                type="file"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            </HStack>
            {formValues.map((item, index) => (
              <Droppable key={index} droppableId={`fields-${index}`}>
                {(provided, snapshot) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    <Text>
                      <Text fontWeight="bold">Key:</Text>
                      <Input
                        value={item.key}
                        onChange={(e) => {
                          const newFormValues = [...formValues];
                          newFormValues[index].key = e.target.value;
                          setFormValues(newFormValues);
                        }}
                      />
                    </Text>
                    <Text>
                      <Text fontWeight="bold">Value:</Text>
                      <Input
                        value={item.value}
                        onChange={(e) => {
                          const newFormValues = [...formValues];
                          newFormValues[index].value = e.target.value;
                          setFormValues(newFormValues);
                        }}
                        bg={snapshot.isDraggingOver ? 'gray.700' : 'inherit'}
                      />
                    </Text>
                  </Box>
                )}
              </Droppable>
            ))}

            <HStack mt={3}>
              <Button
                colorScheme="teal"
                onClick={() => {
                  //take the form values and create a json files with the key and values
                  const data = {};
                  formValues.forEach((item) => {
                    data[item.key] = item.value;
                  });

                  const dataString = JSON.stringify({
                    data: data,
                  });

                  setGeneratedJSON(true);
                  setJSON(dataString);
                }}
              >
                Generate Config Data
              </Button>
              {generatedJSON && (
                <chakra.a
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    json,
                  )}`}
                  download="data.json"
                >
                  <Button colorScheme="teal" variant="outline">
                    Download JSON
                  </Button>
                </chakra.a>
              )}
            </HStack>
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default DocumentCreator;
