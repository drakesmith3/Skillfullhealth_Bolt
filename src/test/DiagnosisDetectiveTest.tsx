import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DiagnosisDetectiveGame from '../pages/DiagnosisDetective';

// Mock toast for testing
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock sound utilities
jest.mock('../utils/soundUtils', () => ({
  soundManager: {
    playSound: jest.fn(),
  },
  playClick: jest.fn(),
  playWhoosh: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('DiagnosisDetective Game', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main menu correctly', () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    expect(screen.getByText('DIAGNOSIS DETECTIVE')).toBeInTheDocument();
    expect(screen.getByText('Master Medical Triads Through Interactive Cases')).toBeInTheDocument();
    expect(screen.getByText('START GAME')).toBeInTheDocument();
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument();
  });

  test('shows curriculum when curriculum button is clicked', async () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    const curriculumButton = screen.getByText('CURRICULUM');
    fireEvent.click(curriculumButton);
    
    await waitFor(() => {
      expect(screen.getByText('Game Curriculum')).toBeInTheDocument();
    });
  });

  test('starts game when start button is clicked', async () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    const startButton = screen.getByText('START GAME');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('LIVES')).toBeInTheDocument();
      expect(screen.getByText('SCORE')).toBeInTheDocument();
      expect(screen.getByText('TIME')).toBeInTheDocument();
    });
  });

  test('keyboard navigation works', async () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    // Start the game first
    const startButton = screen.getByText('START GAME');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('LIVES')).toBeInTheDocument();
    });

    // Test keyboard navigation
    fireEvent.keyDown(document, { key: 'a' });
    // This would select option A if available
    
    fireEvent.keyDown(document, { key: 'Escape' });
    // This should return to menu
    
    await waitFor(() => {
      expect(screen.getByText('START GAME')).toBeInTheDocument();
    });
  });

  test('level selection works', async () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    // Look for level selection elements
    const levelElements = screen.getAllByText(/Cardiac Emergencies|Neurological Syndromes|Abdominal Pathology/);
    expect(levelElements.length).toBeGreaterThan(0);
  });

  test('booster functionality works', async () => {
    renderWithRouter(<DiagnosisDetectiveGame />);
    
    // Start the game
    const startButton = screen.getByText('START GAME');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('HINT')).toBeInTheDocument();
      expect(screen.getByText('SKIP')).toBeInTheDocument();
      expect(screen.getByText('LIFE')).toBeInTheDocument();
    });

    // Test keyboard shortcuts for boosters
    fireEvent.keyDown(document, { key: '1' }); // Hint
    fireEvent.keyDown(document, { key: '2' }); // Skip
    fireEvent.keyDown(document, { key: '3' }); // Extra Life
  });
});
