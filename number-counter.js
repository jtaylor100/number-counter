function determineTopFiveNumbers(fileContents) {
  // First build up map of numbers => counts, like `wc -c` output
  const numberCounts = 
    // Split file string into array of numbers as strings
    fileContents.split(/\r?\n/)
    // Reduce into object, with key being the number and value the count
    .reduce(function(counts, currentValue) {
      if (!(currentValue in counts))
        counts[currentValue] = 0
  
      counts[currentValue]++
      return counts
    }, {})
  
  // Convert to array entries, to make it sortable
  const numberCountsAsEntries = Object.entries(numberCounts)
  
  // Sort by counts, descending
  numberCountsAsEntries.sort((a, b) => b[1]-a[1])
  
  const topFiveNumbers = numberCountsAsEntries.slice(0, 5)
    .map(a => a[0])

  return topFiveNumbers
}

function fileChanged(event) {
  event.preventDefault();

  // Retrieve file contents
  const fileInputElement = event.target

  // Use textare for output
  const textareaElement = document.getElementById("resultTextArea")

  const fileContents = fileInputElement.files[0].text().then((fileContents) => {
    // Get top five numbers
    const topFiveNumbers = determineTopFiveNumbers(fileContents) 
    
    // Write results to textarea
    textareaElement.value = topFiveNumbers.join("\n")

  }).catch((error) => {
    // Write error message for issues with file access or similar
    textareaElement.value = error.message
  })
}

const fileInputElement = document.getElementById("numbersFileInput");
fileInputElement.addEventListener("input", fileChanged);
