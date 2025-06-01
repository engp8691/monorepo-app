import { Box, Button, VStack } from '@chakra-ui/react'
import { FC, useState } from 'react'

type ItemProps = {
  title: string
  content: string
}

type AccordionProps = {
  items: ItemProps[]
}

export const Accordion: FC<AccordionProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<number | undefined>(undefined)

  return items.map((item, index) =>
    <VStack key={item.title}>
      <Button m="2" onClick={() => setActiveItem(prev => prev === index ? undefined : index)}>{item.title}</Button>
      {index === activeItem &&
        <Box m="2">
          {item.content}
        </Box>}
    </VStack>)
}

