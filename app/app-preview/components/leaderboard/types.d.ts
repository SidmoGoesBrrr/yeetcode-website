export interface User {
  name: string
  leetUsername: string
  username: string
  easy: number
  medium: number
  hard: number
  total: number
  xp: number
  rank: number
}

export interface UserData {
  name: string
  leetUsername: string
}

export interface DailyData {
  dailyComplete: boolean
  streak: number
  todaysProblem: {
    title: string
    titleSlug: string
    difficulty: string
    content: string
    topicTags: Array<{ name: string }>
  }
  error: null | string
  loading: boolean
}

export interface Notification {
  id?: string | number
  type: string
  message: string
}

declare module "./FriendsLeaderboard" {
  const FriendsLeaderboard: React.FC<{
    leaderboard: User[]
    userData: UserData
    notifications: Notification[]
  }>
  export default FriendsLeaderboard
}

declare module "./DuelsSection" {
  const DuelsSection: React.FC<{
    leaderboard: User[]
    userData: UserData
  }>
  export default DuelsSection
}

declare module "./TodaysChallenge" {
  const TodaysChallenge: React.FC<{
    userData: UserData
    dailyData: DailyData
    onDailyComplete: () => void
  }>
  export default TodaysChallenge
}

declare module "./ActiveBounties" {
  const ActiveBounties: React.FC<{
    userData: UserData
  }>
  export default ActiveBounties
}
