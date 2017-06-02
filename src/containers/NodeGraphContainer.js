import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import {Avatar, Back, NodeGraph, Samples, GithubLink, Footer } from 'components'

class NodeGraphContainer extends React.Component {
  componentWillMount () {
    let id = this.props.routeParams.id
    this.props.actions.GET_PRESENT_ARTIST(id)
    this.props.actions.GET_TOP_TRACKS(id)
  }

  getPlaying (id) {
    this.props.actions.GET_PLAYING_TRACK(id)
  }

  render () {
    const NodeAndLines = {
      nodes: [
        {id:'Test1', region: 'PAST', regionIndex: 1},
        {id:'Test2', region: 'PRESENT', regionIndex: 1},
        {id:'Test3', region: 'FUTURE', regionIndex: 0},
        {id:'Test4', region: 'FUTURE', regionIndex: 1},
        {id:'Test5', region: 'FUTURE', regionIndex: 2}
      ],
      lines: [
        {from: 'Test1', to: 'Test2'},
        {from: 'Test2', to: 'Test3'},
        {from: 'Test2', to: 'Test4'},
        {from: 'Test2', to: 'Test5'}
      ]
    }

    return (
      <div className="node-graph-wrapper">
        <Back />
        <GithubLink />
        { this.props.artists.present &&
          <Avatar artistAvatarUrl={this.props.artists.present.image}
                  artistVisible={true}
          />
        }

        { this.props.tracks.length &&
          <Samples tracks={this.props.tracks}
                   playing={this.props.playing}
                   playHandler={::this.getPlaying}
          />
        }
        <NodeGraph nodes={NodeAndLines.nodes} lines={NodeAndLines.lines} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
    tracks: state.tracks,
    playing: state.playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeGraphContainer)
