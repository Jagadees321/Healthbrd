// API configuration and utilities
const API_BASE_URL = 'http://localhost:4000/api';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: any[];
}

export interface User {
  id: string;
  email: string;
  role: 'marketing' | 'medical';
  firstName?: string;
  lastName?: string;
  lastLogin?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'marketing' | 'medical';
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'marketing' | 'medical';
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication API functions
export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response.data!;
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await apiRequest<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response.data!;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiRequest<User>('/auth/me');
    return response.data!;
  },

  async logout(): Promise<void> {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

// Campaign API functions
export const campaignApi = {
  async getCampaigns(): Promise<any[]> {
    const response = await apiRequest<any[]>('/campaigns');
    return response.data!;
  },

  async getCampaign(id: string): Promise<any> {
    const response = await apiRequest<any>(`/campaigns/${id}`);
    return response.data!;
  },

  async createCampaign(campaignData: any): Promise<any> {
    const response = await apiRequest<any>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
    return response.data!;
  },

  async updateCampaign(id: string, campaignData: any): Promise<any> {
    const response = await apiRequest<any>(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData),
    });
    return response.data!;
  },

  async deleteCampaign(id: string): Promise<void> {
    await apiRequest(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  },

  async updateCampaignStatus(id: string, status: string): Promise<any> {
    const response = await apiRequest<any>(`/campaigns/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response.data!;
  },
};

// Medical API functions
export const medicalApi = {
  async getContent(): Promise<any[]> {
    const response = await apiRequest<any[]>('/medical/content');
    return response.data!;
  },

  async uploadContent(contentData: any): Promise<any> {
    const response = await apiRequest<any>('/medical/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
    return response.data!;
  },

  async approveContent(id: string, action: 'Approved' | 'Rejected', notes?: string): Promise<any> {
    const response = await apiRequest<any>(`/medical/content/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ action, notes }),
    });
    return response.data!;
  },

  async toggleLabel(id: string, onLabel: boolean): Promise<any> {
    const response = await apiRequest<any>(`/medical/content/${id}/toggle-label`, {
      method: 'PUT',
      body: JSON.stringify({ onLabel }),
    });
    return response.data!;
  },

  async getAuditLogs(): Promise<any[]> {
    const response = await apiRequest<any[]>('/medical/audit-logs');
    return response.data!;
  },

  async updateReminder(id: string, reminderFrequency: string): Promise<any> {
    const response = await apiRequest<any>(`/medical/content/${id}/reminder`, {
      method: 'PUT',
      body: JSON.stringify({ reminderFrequency }),
    });
    return response.data!;
  },
};

// HCP API functions
export const hcpApi = {
  async getHCPs(): Promise<any[]> {
    const response = await apiRequest<any[]>('/hcp');
    return response.data!;
  },

  async getHCP(id: string): Promise<any> {
    const response = await apiRequest<any>(`/hcp/${id}`);
    return response.data!;
  },

  async createHCP(hcpData: any): Promise<any> {
    const response = await apiRequest<any>('/hcp', {
      method: 'POST',
      body: JSON.stringify(hcpData),
    });
    return response.data!;
  },

  async updateHCP(id: string, hcpData: any): Promise<any> {
    const response = await apiRequest<any>(`/hcp/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hcpData),
    });
    return response.data!;
  },

  async updateEngagement(id: string, engagementData: any): Promise<any> {
    const response = await apiRequest<any>(`/hcp/${id}/engagement`, {
      method: 'PUT',
      body: JSON.stringify(engagementData),
    });
    return response.data!;
  },

  async getAnalytics(): Promise<any> {
    const response = await apiRequest<any>('/hcp/analytics/summary');
    return response.data!;
  },

  async getTopEngaged(): Promise<any[]> {
    const response = await apiRequest<any[]>('/hcp/engagement/top');
    return response.data!;
  },

  async getLeastEngaged(): Promise<any[]> {
    const response = await apiRequest<any[]>('/hcp/engagement/least');
    return response.data!;
  },
};

// Patient API functions
export const patientApi = {
  async getEngagement(): Promise<any> {
    const response = await apiRequest<any>('/patients/engagement');
    return response.data!;
  },

  async createEngagement(engagementData: any): Promise<any> {
    const response = await apiRequest<any>('/patients/engagement', {
      method: 'POST',
      body: JSON.stringify(engagementData),
    });
    return response.data!;
  },

  async updateEngagement(id: string, engagementData: any): Promise<any> {
    const response = await apiRequest<any>(`/patients/engagement/${id}`, {
      method: 'PUT',
      body: JSON.stringify(engagementData),
    });
    return response.data!;
  },

  async getAnalytics(): Promise<any> {
    const response = await apiRequest<any>('/patients/analytics');
    return response.data!;
  },
};

// Dashboard API functions
export const dashboardApi = {
  async getMetrics(): Promise<any> {
    const response = await apiRequest<any>('/dashboard/metrics');
    return response.data!;
  },

  async getCampaigns(): Promise<any[]> {
    const response = await apiRequest<any[]>('/dashboard/campaigns');
    return response.data!;
  },

  async getAlerts(): Promise<any[]> {
    const response = await apiRequest<any[]>('/dashboard/alerts');
    return response.data!;
  },

  async getROISignals(): Promise<any[]> {
    const response = await apiRequest<any[]>('/dashboard/roi-signals');
    return response.data!;
  },

  async updateMetrics(metricsData: any): Promise<any> {
    const response = await apiRequest<any>('/dashboard/metrics/update', {
      method: 'POST',
      body: JSON.stringify(metricsData),
    });
    return response.data!;
  },
};

export default {
  authApi,
  campaignApi,
  medicalApi,
  hcpApi,
  patientApi,
  dashboardApi,
};

