import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Colors from '../../../Colors.json'
import Server from '../../Server.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  border: 1px solid lightGray;
  min-height: 50vh;
`

const List = styled.ul `
  padding: 1rem;
`

const Item = styled.li `
  list-style: none;
`

const Card = styled.div `
  background: dodgerblue;
  color: ${ ColorScheme.light };
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  height: 80px;
  margin: 0 0 .5rem 0;
  padding: .5rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const Content = styled.div ``
const Message = styled.p `
  font-size: .8rem;
`
const Date = styled(Message) `
  font-style: italic;
  margin: .3rem 0 0 0;
`

const Amount = styled(Message) `
  font-weight: 700;
  text-align: right;
`
const Status = styled(Message) `
  margin: .3rem 0 0 0;
  text-align: right;
`

function History(props) {

  const [entries, setEntries] = useState ([])
  const history = useHistory ()

  useEffect(() => {
    const pe = require ('./paginate-entries')
    pe.paginateEntries (Server, history, props.pageNumber)
    .then ((data) => {
      setEntries (data)
    })
  }, [history, props.pageNumber])

  return (
    <Wrapper>
      <List>
        {
          entries.map ((t, i) => {
            return <Item key = { i }>
              <Card>
                <Content>
                  <Message>{ t.message }</Message>
                  <Date>{ moment (t.updatedAt ).format ('MMM dd, yyyy HH:mm') }</Date>
                </Content>
                <Content>
                  <Amount>{
                    new Intl.NumberFormat ('en-PH', {
                      style: 'currency',
                      currency: 'PHP'
                    }).format (t.amount)
                  }</Amount>
                  <Status>{ t.status }</Status>
                </Content>
              </Card>
            </Item>
          })
        }
      </List>
    </Wrapper>
  )
}

export default History
