import React from 'react'
import { Fade } from 'react-awesome-reveal';
import { MdDevices } from 'react-icons/md';
import { AiFillPicture } from 'react-icons/ai';

function Specification () {

  const data = [
    {
      title: 'Well Designed',
      icon: AiFillPicture,
      features: [
        'Minimal design',
        'Readable typography',
        'Beautiful color scheme',
        'Smooth animation'
      ]
    },
    {
      title: 'Mobile Friendly',
      icon: MdDevices,
      features: [
        'Google APIs',
        'Fully responsive',
        'Mobile navigation',
        'Social media integration'
      ]
    }
  ]

  return (
    <div className = 'specs'>
      <Fade duration = { 350 } delay = { 300 } direction = 'right' cascade triggerOnce>
        {
          data.map ((item, x) => {
            return <div className = 'card' key = { x }>
              {
                item.icon && <item.icon />
              }
              <h3>{ item.title }</h3>
              <ul>
                {
                  item.features.map ((feature, i) => {
                    return <li key = { `${x}${i}` }>
                      <span>{ feature }</span>
                    </li>
                  })
                }
              </ul>
            </div>
          })
        }
      </Fade>
    </div>
  )
}

export default Specification;