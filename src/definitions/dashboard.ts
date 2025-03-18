export interface DashBoardMenuResponse{
    success: boolean,
    data?: {
      permissions: string[]
    },
    message?: string
  }