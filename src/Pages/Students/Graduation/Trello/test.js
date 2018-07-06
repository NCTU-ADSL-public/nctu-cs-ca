import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

storiesOf('React Trello', module).add(
    'Custom Lane Template',
    withInfo('Style your lane header appearance')(() => {
      const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'Planned Tasks',
            label: 'First Lane here',
            cards: [
              {
                id: 'Card1',
                title: 'John Smith',
                description: 'Thanks. Please schedule me for an estimate on Monday.'
              },
              {
                id: 'Card2',
                title: 'Card Weathers',
                description: 'Email received at 1:14pm'
              }
            ]
          },
          {
            id: 'lane2',
            title: 'Completed Tasks',
            label: 'Second Lane here',
            cards: [
              {
                id: 'Card3',
                title: 'Michael Caine',
                description: 'You are welcome. Interested in doing business with you' + ' again',
                tags: [
                                {title: 'Critical', color: 'white', bgcolor: 'red'},
                                {title: '2d ETA', color: 'white', bgcolor: '#0079BF'}
                ]
              }
            ]
          }
        ]
      }

      return <Board data={data} customLancustomLaneHeadereHeader={<CustomLaneHeader />} />
    })
)
