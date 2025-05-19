import type { Meta, StoryObj } from '@storybook/react';
import { AdvancedSkillsCertificates } from './ProfessionalDashboardSections';

// Add type definition for certificate status
type CertificateStatus = "EXPIRED" | "CURRENT" | "EXPIRING_SOON";

const meta = {
  title: 'Dashboard/AdvancedSkillsCertificates',
  component: AdvancedSkillsCertificates,
  parameters: {
    layout: 'centered',
    // Add any required context providers
    decorators: [(Story) => (
      <div className="p-6 max-w-4xl mx-auto">
        <Story />
      </div>
    )],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdvancedSkillsCertificates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    certificates: [
      { 
        name: "MBBS", 
        status: "CURRENT" as CertificateStatus,
        expiryDate: "2024-12-31",
        url: "https://example.com/cert"
      },
      { 
        name: "EMR-PROFICIENCY",
        status: "CURRENT" as CertificateStatus, // Changed from "PENDING" to "CURRENT"
        expiryDate: null,
        url: null
      }
    ],
    onUpload: async (file: File, certificateId: string) => {
      console.log('Uploading file:', file, 'for certificate:', certificateId);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onUpdateExpiry: async (certificateId: string, date: string) => {
      console.log('Updating expiry:', date, 'for certificate:', certificateId);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};