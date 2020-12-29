import React, { useState } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div `
  padding: .5rem;
`

const List = styled.ul `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .3rem;
`

const Item = styled.li `
  list-style: none;
`

const Page = styled.button `
  border: 1px solid lightGray;
  padding: .7rem 1rem;
  cursor: pointer;
  &.active {
    background: dodgerblue;
    color: white;
    border: none;
  }
`

function Pagination (props) {
  
  const [selected, setSelected] = useState (1)
  const handlePage = (e) => {
    const selected = parseInt (e.target.textContent)
    setSelected (selected)
    if (props.handlePage) {
      props.handlePage (selected)
    }
  }

  return (
    <Wrapper>
      <List>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map ((p, i) => {
            return <Item key = { i }>
              <Page 
                type = 'button'
                onClick = { handlePage }
                className = { `${ (i + 1 ) === selected ? 'active' : '' }` }>{ p }</Page>
            </Item>
          })
        }
      </List>
    </Wrapper>
  )
}

export default Pagination
