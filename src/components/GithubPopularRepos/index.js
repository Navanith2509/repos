import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {activeId: 'ALL', list: [], status: statusList.success}

  getData = async () => {
    const {activeId} = this.state
    console.log(activeId)
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const updatedData = data.popular_repos.map(each => ({
      name: each.name,
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      issuesCount: each.issues_count,
      starsCount: each.stars_count,
    }))

    if (response.ok === true) {
      return this.setState({list: updatedData, status: statusList.success})
    }
    return this.setState({status: statusList.failure})
  }

  failure = () => {}

  userClick = id => {
    this.setState({activeId: id, status: statusList.inProgress}, this.getData)
  }

  renderSuccessView = () => {
    const {list} = this.state
    return (
      <div>
        <h1>popular</h1>
        <ul>
          {languageFiltersData.map(each => {
            return (
              <LanguageFilterItem
                key={each.id}
                details={each}
                userClick={this.userClick}
              />
            )
          })}
        </ul>
        <div>
          {list.map(each => {
            return <RepositoryItem key={each.id} details={each} />
          })}
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {list} = this.state
    return (
      <div>
        <h1>popular</h1>
        <ul>
          {languageFiltersData.map(each => {
            return (
              <LanguageFilterItem
                key={each.id}
                details={each}
                userClick={this.userClick}
              />
            )
          })}
        </ul>

        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />

        <div>
          {list.map(each => {
            return <RepositoryItem key={each.id} details={each} />
          })}
        </div>
      </div>
    )
  }

   renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case statusList.success:
        return this.renderSuccessView()

      case statusList.failure:
        return this.renderFailureView()
        
      case statusList.inProgress:
        return this.renderLoadingView()
      default :
        return null
    }
    
  }
}
export default GithubPopularRepos