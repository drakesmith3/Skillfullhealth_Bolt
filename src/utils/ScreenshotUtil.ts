
import html2canvas from 'html2canvas';

/**
 * Utility for taking screenshots of DOM elements
 */
export class ScreenshotUtil {
  /**
   * Takes a screenshot of a DOM element
   * @param element The DOM element to screenshot
   * @returns Promise resolving to a data URL of the screenshot
   */
  static async captureElement(element: HTMLElement): Promise<string> {
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: window.devicePixelRatio,
      });
      
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      throw error;
    }
  }
  
  /**
   * Downloads a screenshot of a DOM element
   * @param element The DOM element to screenshot
   * @param filename The filename for the downloaded image
   */
  static async downloadElementAsImage(element: HTMLElement, filename: string = 'screenshot.png'): Promise<void> {
    try {
      const dataUrl = await this.captureElement(element);
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Failed to download screenshot:', error);
      throw error;
    }
  }
}
