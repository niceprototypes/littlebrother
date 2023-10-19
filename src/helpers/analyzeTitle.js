import pluralize from "pluralize"

import data from "../constants/keywords.json"

const {matches: matchesData, tags: tagsData} = data

function analyzeTitle(title) {
  // Initialize included words
  const includedWords = new Set()
  // Initialize matches object
  const matches = {}
  // Initialize tags array
  const tags = []

  /**
   * 1. Remove any title character that is not alphanumeric
   * 2. Set characters to lowercase
   * 3. Split words by spaces
   * 4. Change plural words to singular form
   * */
  const titleWords = title
    .replace(/[^a-zA-Z0-9/\s+]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .map((titleWord) => pluralize.singular(titleWord))

  // Store match as tag
  const storeTag = ({accuracy, weight, ...match}) => {
    // Determine if tag exists
    const tagExists = tags.filter((tag) => tag.root === match.root).length > 0

    // If tag does not exist
    if (!tagExists) {
      // Calculate match score using accuracy and weight
      const matchScore = accuracy * weight

      // Push new tag to tags array
      tags.push({...match, score: matchScore})
    }
  }

  // Get match keys from data
  const matchKeys = Object.keys(matchesData)
  // Iterate over matches
  for (let matchIndex = 0; matchIndex < matchKeys.length; matchIndex += 1) {
    // Initialize match key
    const matchKey = matchKeys[matchIndex]

    // Split match string into words based on spaces and change each word to singular
    const matchWords = matchKey.split(/\s+/).map((matchWord) => pluralize.singular(matchWord))

    // Add words to match object
    matches[matchKey] = {
      ...matchesData[matchKey],
      words: matchWords,
    }

    // Add match words to set of included words
    matchWords.forEach((matchWord) => includedWords.add(matchWord))
  }

  // Filter title words by whether the word exists in set of included words
  const titleWordsFiltered = titleWords.filter((titleWord) => includedWords.has(titleWord))

  // Iterate over title words
  for (let titleWordIndex = 0; titleWordIndex < titleWordsFiltered.length; titleWordIndex += 1) {
    // Analyze each title word
    analyzeWord(titleWordsFiltered, titleWordIndex, matches, storeTag)
  }

  // Sort tags by accuracy from high to low
  const tagsSorted = tags.sort((a, b) => b.score - a.score)

  // Initialize primary tag
  const primaryTag = tagsSorted[0]
  // Initialize cover
  let cover = null

  // If primary tag exists and has covers
  if (!!primaryTag && primaryTag.covers.length > 0) {
    // Choose random cover
    cover = chooseRandomCover(primaryTag.covers)
  }

  return {
    cover,
    tags: tagsSorted,
  }
}

function analyzeWord(titleWords, titleWordIndex, matches, storeTag) {
  // Initialize temporary title word index
  let temporaryTitleWordIndex = titleWordIndex
  // Initialize title word
  let titleWord = titleWords[titleWordIndex]

  // Get keys from matches object
  const matchKeys = Object.keys(matches)

  // Iterate over match keys
  for (const matchKeyIndex in matchKeys) {
    // Initialize match key
    const matchKey = matchKeys[matchKeyIndex]

    // Initialize match words
    const matchWords = matches[matchKey].words

    // Iterate over match words
    for (let matchWordIndex = 0; matchWordIndex < matchWords.length; matchWordIndex += 1) {
      // Initialize match word
      const matchWord = matchWords[matchWordIndex]

      // Update title word based on temporary index
      titleWord = titleWords[temporaryTitleWordIndex]

      // 🔴 If match word is not equal to title word, break
      if (matchWord !== titleWord) {
        break
      }

      // Initialize next match word
      const nextMatchWord = matchWords[matchWordIndex + 1]

      // 🟢 If next match word does not exist
      if (!nextMatchWord) {
        // Initialize match
        const match = matches[matchKey]

        // Store match with accompanying data
        storeTag({...match, ...tagsData[match.root]})

        break
      }

      // Update temporary title word index
      temporaryTitleWordIndex += 1

      // Initialize next title word
      const nextTitleWord = titleWords[temporaryTitleWordIndex]

      // 🔴 If next title word does not exist or is not equal to next match word, break
      if (!nextTitleWord || nextMatchWord !== nextTitleWord) {
        break
      }
    }
  }
}

function chooseRandomCover(covers) {
  // Choose random index from 0 to max index
  const randomIndex = Math.ceil(Math.random() * covers.length) - 1

  // Return random cover
  return covers[randomIndex]
}

export default analyzeTitle
