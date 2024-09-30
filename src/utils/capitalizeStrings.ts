export function capitalizeWordsWithHyphen(input: string): string {
  return input
      .split(' ') // Split by spaces first
      .map(segment => 
          segment.split('-') // Split each segment by hyphens
              .map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1) // Capitalize each word
              )
              .join('-') // Join back with hyphens
      )
      .join(' '); // Join the segments back with spaces
}
