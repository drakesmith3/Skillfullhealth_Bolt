
/**
 * Utility for capturing screenshots of the UI
 * (For development and debugging purposes)
 */
export class ScreenshotUtil {
  /**
   * Capture a screenshot of a DOM element
   * @param element The DOM element to capture
   * @param fileName Optional filename for the download
   */
  public static async captureElement(element: HTMLElement, fileName?: string): Promise<void> {
    try {
      // Ensure html2canvas is available
      const html2canvas = await import('html2canvas').then(module => module.default);
      
      // Capture the element
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio || 1,
      });
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Download or return the data URL
      if (fileName) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }
      
      return dataUrl;
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      throw error;
    }
  }
  
  /**
   * Capture viewport as seen by the user
   * @param fileName Optional filename for the download
   */
  public static async captureViewport(fileName?: string): Promise<void> {
    return ScreenshotUtil.captureElement(document.documentElement, fileName);
  }
}
