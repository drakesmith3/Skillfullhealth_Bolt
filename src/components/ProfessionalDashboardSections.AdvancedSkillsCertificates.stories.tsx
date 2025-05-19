import type { Meta, StoryObj } from '@storybook/react';

import { AdvancedSkillsCertificates } from './ProfessionalDashboardSections';

const meta = {
  component: AdvancedSkillsCertificates,
} satisfies Meta<typeof AdvancedSkillsCertificates>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};