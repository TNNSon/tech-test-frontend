import React from "react";
import { IAppTabContainer } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionThree.css";

export const QuestionThree: React.FC<IAppTabContainer> = () => {
  return (
    <SectionGroup>
      <SectionPanel>
        <div className="question-three">
          <nav className="navigation">
            <ul className="menu">
              <li className="menu-item round "></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
            </ul>
            <div>
              <div className="setting round"></div>
            </div>
          </nav>
          <main>
            <header className="header container">
              <h2>Header</h2>
            </header>
            <div className="main">
              <section className="job-list container overflow-y">
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a fence</b> (Job #0)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:00 - 11:00</div>
                  <div className="job-resources">3</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a shed</b> (Job #1)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:15 - 11:00</div>
                  <div className="job-resources">2</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Shield some wiring</b> (Job #3)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Brisbane</div>
                  <div className="job-time">9:00 - 13:00</div>
                  <div className="job-resources">2</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a fence</b> (Job #0)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:00 - 11:00</div>
                  <div className="job-resources">3</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a fence</b> (Job #0)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:00 - 11:00</div>
                  <div className="job-resources">3</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a fence</b> (Job #0)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:00 - 11:00</div>
                  <div className="job-resources">3</div>
                </div>
                <div className="job-item">
                  <div className="job-title">
                    <b>Build a fence</b> (Job #0)
                  </div>
                  <div className="job-contact">Brisbane</div>
                  <div className="job-date">Sat Sep 01 2018</div>
                  <div className="job-time">10:00 - 11:00</div>
                  <div className="job-resources">3</div>
                </div>
              </section>
              <section className="contact-list container overflow-y">
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
                <div className="contact-item"></div>
              </section>
            </div>
          </main>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
