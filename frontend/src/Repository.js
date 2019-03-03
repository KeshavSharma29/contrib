import React, { Component } from "react";
import "./Repository.css";
import { Icon, Label, Image } from "semantic-ui-react";
import tinycolor from "tinycolor2";

import { Popup, Segment } from "semantic-ui-react";

function format_number(num) {
  if (num >= 1000000) {
    return Math.floor(num / 1000000) + "m";
  }
  if (num >= 1000) {
    return Math.floor(num / 1000) + "k";
  }
  return num;
}

class Stat extends Component {
  render() {
    return (
      <Popup
        trigger={
          <div>
            <Icon className={this.props.class_name} name={this.props.icon} />
            {format_number(this.props.value)}
          </div>
        }
        on="hover"
      >
        <Popup.Content>{this.props.children}</Popup.Content>
      </Popup>
    );
  }
}

class Stats extends Component {
  render() {
    const is_max =
      this.props.num_issues >
      this.props.labels.reduce((acc, curr) => acc + curr.count, 0);

    return (
      <div className="Stats-container">
        <Stat class_name="Stats-star" icon="star" value={this.props.num_stars}>
          {"Number of Stars"}
        </Stat>
        <Stat class_name="Stats-fork" icon="fork" value={this.props.num_forks}>
          {"Number of Forks"}
        </Stat>
        <Stat
          class_name="Stats-issue"
          icon="exclamation circle"
          value={this.props.num_issues}
        >
          <span>{"Number of Issues with Label "}</span>
          {this.props.labels.map(label => (
            <div className="Stats-issue-label-container" key={label.name}>
              <span
                className="Stats-issue-label"
                style={{
                  color:
                    tinycolor(label.color).getBrightness() > 128
                      ? "black"
                      : "white",
                  backgroundColor: "#" + label.color
                }}
              >
                {label.name}
              </span>
              {" (" + label.count + (is_max ? "+" : "") + ")"}
            </div>
          ))}
        </Stat>
      </div>
    );
  }
}

class Description extends Component {
  render() {
    let num_topics = 0;
    let topics_char_count = 0;
    for (; num_topics < this.props.topics.length; ++num_topics) {
      topics_char_count += this.props.topics[num_topics].name.length;
      if (topics_char_count >= 60) {
        break;
      }
    }
    return (
      <div className="Description-container">
        <a
          className="Description-link"
          target="_blank"
          rel="noopener noreferrer"
          href={
            this.props.url +
            '/issues?q=is:open is:issue label:"' +
            this.props.labels[0].name +
            '"'
          }
        >
          {this.props.name_with_owner}
        </a>
        <div className="Description-text">{this.props.description}</div>
        <div className="Repository-topics">
          {this.props.topics.slice(0, num_topics).map(topic => {
            return (
              <Label
                key={topic.name}
                className="Repository-topic"
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={topic.url}
              >
                {topic.name}
              </Label>
            );
          })}
        </div>
      </div>
    );
  }
}

class Repository extends Component {
  render() {
    return (
      <Segment>
        <div className="Repository-container">
          <Image src={this.props.avatar_url} size="tiny" />
          <Stats
            num_stars={this.props.num_stars}
            num_forks={this.props.num_forks}
            num_issues={this.props.num_issues}
            labels={this.props.labels}
          />
          <Description
            name_with_owner={this.props.name_with_owner}
            url={this.props.url}
            description={this.props.description}
            labels={this.props.labels}
            topics={this.props.topics}
          />
        </div>
      </Segment>
    );
  }
}

export default Repository;
