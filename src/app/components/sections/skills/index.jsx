import React from 'react';
import { FaCss3, FaHtml5, FaJava, FaJs } from 'react-icons/fa';
import { SiMongodb, SiMariadb, SiMysql } from 'react-icons/si';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import { Fade } from 'react-awesome-reveal';

import AnimatedProgressProvider from '../../provider/anim-progress';
import "react-circular-progressbar/dist/styles.css";
import ExpressJS from '../../../assets/mern/expressjs-icon.svg';
import NodeJS from '../../../assets/mern/nodejs-icon.svg';
import ReactJS from '../../../assets/mern/reactjs-icon.svg';

import config from '../../../../config.json';

function Skills () {

  const toIcon = (name) => {
    if (name.toLowerCase () === 'java') return <FaJava />
    if (name.toLowerCase () === 'css') return <FaCss3 />
    if (name.toLowerCase () === 'html') return <FaHtml5 />
    if (name.toLowerCase () === 'js') return <FaJs />
    if (name.toLowerCase () === 'mongodb') return <SiMongodb />
    if (name.toLowerCase () === 'mariadb') return <SiMariadb />
    if (name.toLowerCase () === 'mysql') return <SiMysql />
    if (name.toLowerCase () === 'expressjs') return <img src = { ExpressJS } alt = 'express-js' />
    if (name.toLowerCase () === 'nodejs') return <img src = { NodeJS } alt = 'node-js' />
    if (name.toLowerCase () === 'reactjs') return <img src = { ReactJS } alt = 'react-js' />

  }

  const circularProgressStyle = buildStyles({
    pathTransition: 'none',
    strokeLinecap: 'round'
  });
  
  const skills = [
    { conf: config.dev.skills.web, title: 'Web programming languages' },
    { conf: config.dev.skills.jsfw, title: 'Javascript libraries / frameworks' },
    { conf: config.dev.skills.db, title: 'Database' },
  ]

  return (
    <section name = 'mySkills' className = 's-skills'>
      
      <div className = 'wrapper'>
        <div className = 'intro'>
          <span className = 'mini-title'>I play with these languages</span>
          <h1 className = 'title'>See what programming languages i code.</h1>
        </div>

        {
          skills.map ((skill, s) => {
            return <div className = 'lang' key = { s }>
              <span className = 'mini-title'>{ skill.title }</span>
              <Fade cascade = { true } duration = { 1000 } direction = 'up' triggerOnce>
                <ul>
                  {
                    skill.conf.map ((lang, i) => {
                      return <li className = { lang.name.toLowerCase () } key = { i }>
                        <AnimatedProgressProvider key = { i } valueStart = { 0 } valueEnd = { lang.value } duration = { 1 } easingFunction = { easeQuadInOut }>
                          {
                            (value) => {
                              // const round = Math.round (value);
                              return <CircularProgressbarWithChildren value = { value } styles = { circularProgressStyle }> {
                                toIcon (lang.name.toLowerCase ())
                              } </CircularProgressbarWithChildren>
                            }
                          }
                        </AnimatedProgressProvider>
                        <p className = 'lang'>{ lang.name }</p>
                      </li>
                    })
                  }
                </ul>   
              </Fade>
            </div>
          })
        }

        <div className = 'web-stack'></div>
        <div className = 'js-framework'></div>
        <div className = 'js-api'></div>
      </div>

    </section>
  )
}

export default Skills;