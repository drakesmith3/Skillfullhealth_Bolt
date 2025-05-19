import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdvancedSkillsCertificates } from './ProfessionalDashboardSections';

describe('AdvancedSkillsCertificates', () => {
  const mockCertificates = [
    { 
      name: "MBBS", 
      status: "CURRENT",
      expiryDate: "2024-12-31",
      url: "https://example.com/cert"
    }
  ];

  const mockOnUpload = jest.fn();
  const mockOnUpdateExpiry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders certificates list correctly', () => {
    render(
      <AdvancedSkillsCertificates 
        certificates={mockCertificates}
        onUpload={mockOnUpload}
        onUpdateExpiry={mockOnUpdateExpiry}
      />
    );

    expect(screen.getByText('MBBS')).toBeInTheDocument();
    expect(screen.getByText('CURRENT')).toBeInTheDocument();
  });

  it('handles file upload correctly', async () => {
    render(
      <AdvancedSkillsCertificates 
        certificates={mockCertificates}
        onUpload={mockOnUpload}
        onUpdateExpiry={mockOnUpdateExpiry}
      />
    );

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/Choose MBBS certificate file/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(file, 'MBBS');
    });
  });

  it('handles expiry date updates correctly', async () => {
    render(
      <AdvancedSkillsCertificates 
        certificates={mockCertificates}
        onUpload={mockOnUpload}
        onUpdateExpiry={mockOnUpdateExpiry}
      />
    );

    const dateInput = screen.getByLabelText(/Set expiry date for MBBS/i);
    fireEvent.change(dateInput, { target: { value: '2025-12-31' } });

    await waitFor(() => {
      expect(mockOnUpdateExpiry).toHaveBeenCalledWith('MBBS', '2025-12-31');
    });
  });

  it('shows loading state during upload', async () => {
    render(
      <AdvancedSkillsCertificates 
        certificates={mockCertificates}
        onUpload={async () => new Promise(resolve => setTimeout(resolve, 100))}
        onUpdateExpiry={mockOnUpdateExpiry}
      />
    );

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/Choose MBBS certificate file/i);

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText('Uploading...')).toBeInTheDocument();
  });
});

"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"