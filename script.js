// Check if user is authorized
function checkAuth() {
  const isAuthorized = localStorage.getItem("authorized") === "true"

  // If on dashboard page but not authorized, redirect to login
  if (window.location.pathname.includes("dashboard") && !isAuthorized) {
    window.location.href = "index.html"
  }

  // If on login page but already authorized, redirect to dashboard
  if (window.location.pathname.endsWith("index.html") && isAuthorized) {
    window.location.href = "dashboard.html"
  }
}

// Run auth check on page load
checkAuth()

// Access Form Handling
const accessForm = document.getElementById("access-form")
if (accessForm) {
  accessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const accessCode = document.getElementById("access-code").value
    const errorMessage = document.getElementById("error-message")

    if (accessCode === "2005") {
      localStorage.setItem("authorized", "true")
      window.location.href = "dashboard.html"
    } else {
      errorMessage.classList.remove("hidden")
      setTimeout(() => {
        errorMessage.classList.add("hidden")
      }, 3000)
    }
  })
}

// Dashboard Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Only run dashboard code if we're on the dashboard page
  if (!document.querySelector(".dashboard-container")) return

  // Load saved data
  loadSavedData()

  // Tab Switching
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab")

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Show selected tab pane
      tabPanes.forEach((pane) => {
        pane.classList.remove("active")
        if (pane.id === tabName) {
          pane.classList.add("active")
        }
      })
    })
  })

  // Theme Toggle - Updated to use a simpler toggle without sun/moon icons
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", toggleTheme)

  // Logout Button
  const logoutBtn = document.getElementById("logout-btn")
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authorized")
    window.location.href = "index.html"
  })

  // Avatar Upload
  const uploadAvatarBtn = document.getElementById("upload-avatar")
  const avatarInput = document.getElementById("avatar-input")
  const avatarImg = document.getElementById("avatar-img")

  uploadAvatarBtn.addEventListener("click", () => {
    avatarInput.click()
  })

  avatarInput.addEventListener("change", handleAvatarChange)

  // Quick Notes
  const quickNotes = document.getElementById("quick-notes")
  const saveNotesBtn = document.getElementById("save-notes")

  if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", () => {
      localStorage.setItem("quickNotes", quickNotes.value)
      showToast("Notes saved successfully!")
    })
  }

  // Make notice banner dismissible
  const noticeBanner = document.querySelector(".notice-banner")
  if (noticeBanner) {
    // Check if banner was previously dismissed
    const bannerDismissed = localStorage.getItem("noticeBannerDismissed")

    if (!bannerDismissed) {
      // Add close button if not already present
      if (!noticeBanner.querySelector(".close-banner")) {
        const closeButton = document.createElement("button")
        closeButton.className = "close-banner"
        closeButton.innerHTML = "&times;"
        closeButton.addEventListener("click", () => {
          noticeBanner.style.display = "none"
          // Set dismissed flag but only for this session
          localStorage.setItem("noticeBannerDismissed", "true")
        })
        noticeBanner.appendChild(closeButton)
      }
    } else {
      // If previously dismissed, hide it
      noticeBanner.style.display = "none"
    }
  }

  // Learning Progress Period Selector
  const progressPeriodSelect = document.getElementById("progress-period")
  if (progressPeriodSelect) {
    progressPeriodSelect.addEventListener("change", updateLearningProgress)
  }

  // Initialize learning progress
  updateLearningProgress()

  // Popular Currently (formerly Quick Links)
  loadPopularContent()

  // Refresh Popular Content button
  const refreshPopularBtn = document.getElementById("refresh-popular")
  if (refreshPopularBtn) {
    refreshPopularBtn.addEventListener("click", () => {
      loadPopularContent(true) // Force refresh
    })
  }

  // Make Degree Progress, Requirements, and Plan customizable
  setupCustomizableSections()

  // Initialize Quiz Mode
  setupQuizMode()

  // Initialize Circuit Design functionality
  setupCircuitDesigns()

  // Initialize Electrical Tools
  setupElectricalTools()

  // Initialize Electrical Engineering Resources
  setupResources()

  // Load saved course lists
  loadSavedCourseLists()
  
  // Setup course tabs
  setupCourseTabs()
  
  // Setup degree progress update
  setupDegreeProgress()
  
  // Setup flashcard functionality
  setupFlashcards()
  
  // Add event listeners to course items
  addCourseItemListeners()
  
  // Add event listeners to study set items
  addStudySetItemListeners()
  
  // Add event listeners to circuit items
  addCircuitItemListeners()
  
  // Add event listener to add course button
  const addCourseBtn = document.getElementById("add-course-btn")
  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", () => {
      openModal(document.getElementById("add-course-modal"))
    })
  }
  
  // Add event listener to create study set button
  const createSetBtn = document.getElementById("create-set-btn")
  if (createSetBtn) {
    createSetBtn.addEventListener("click", () => {
      openModal(document.getElementById("create-set-modal"))
    })
  }
  
  // Add event listener to add term button
  const addTermBtn = document.getElementById("add-term-btn")
  if (addTermBtn) {
    addTermBtn.addEventListener("click", addNewTerm)
  }
  
  // Add event listener to save course button
  const saveCourseBtn = document.getElementById("save-course-btn")
  if (saveCourseBtn) {
    saveCourseBtn.addEventListener("click", handleAddCourse)
  }
  
  // Add event listener to save study set button
  const saveSetBtn = document.getElementById("save-set-btn")
  if (saveSetBtn) {
    saveSetBtn.addEventListener("click", handleCreateStudySet)
  }
  
  // Add event listener to save section button
  const saveSectionBtn = document.getElementById("save-section-btn")
  if (saveSectionBtn) {
    saveSectionBtn.addEventListener("click", saveSectionContent)
  }
  
  // Add event listener to course status select
  const courseStatus = document.getElementById("course-status")
  if (courseStatus) {
    courseStatus.addEventListener("change", () => {
      const status = courseStatus.value
      const gradeContainer = document.getElementById("grade-container")
      const semesterContainer = document.getElementById("semester-container")
      
      if (status === "completed") {
        gradeContainer.classList.remove("hidden")
        semesterContainer.classList.add("hidden")
      } else if (status === "planned") {
        gradeContainer.classList.add("hidden")
        semesterContainer.classList.remove("hidden")
      } else {
        gradeContainer.classList.add("hidden")
        semesterContainer.classList.add("hidden")
      }
    })
  }
  
  // Add event listeners to modal close buttons
  const modalCloseButtons = document.querySelectorAll(".modal-close, .modal-cancel")
  modalCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      closeModal(modal)
    })
  })
  
  // Add event listeners to flashcard navigation
  const prevCardBtn = document.getElementById("prev-card")
  const nextCardBtn = document.getElementById("next-card")
  const flashcard = document.querySelector(".flashcard")
  
  if (prevCardBtn && nextCardBtn && flashcard) {
    prevCardBtn.addEventListener("click", () => navigateFlashcard("prev"))
    nextCardBtn.addEventListener("click", () => navigateFlashcard("next"))
    flashcard.addEventListener("click", () => {
      flashcard.classList.toggle("flipped")
    })
  }
  
  // Add event listener to chat form
  const chatForm = document.getElementById("chat-form")
  if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit)
  }
  
  // Add event listener to edraw form
  const edrawForm = document.getElementById("edraw-form")
  if (edrawForm) {
    edrawForm.addEventListener("submit", handleEdrawSubmit)
  }
})

// Function to update learning progress based on selected period
function updateLearningProgress() {
  const progressPeriodSelect = document.getElementById("progress-period")
  if (!progressPeriodSelect) return

  const period = progressPeriodSelect.value

  // Get learning data from localStorage
  const learningData = JSON.parse(localStorage.getItem("learningData") || "[]")

  // Filter data based on selected period
  const now = new Date()
  let filteredData = []

  if (period === "3days") {
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    filteredData = learningData.filter((item) => new Date(item.date) >= threeDaysAgo)
  } else if (period === "week") {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    filteredData = learningData.filter((item) => new Date(item.date) >= weekAgo)
  } else {
    // All time
    filteredData = learningData
  }

  // Calculate statistics
  const termsStudied = filteredData.reduce((sum, item) => sum + item.termsStudied, 0)
  const correctAnswers = filteredData.reduce((sum, item) => sum + item.correctAnswers, 0)
  const totalAnswers = filteredData.reduce((sum, item) => sum + item.totalAnswers, 0)
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

  // Update UI
  const termsStudiedElement = document.getElementById("terms-studied")
  const accuracyElement = document.getElementById("accuracy")
  const streakElement = document.getElementById("streak")

  if (termsStudiedElement) termsStudiedElement.textContent = termsStudied
  if (accuracyElement) accuracyElement.textContent = `${accuracy}%`

  // Streak calculation is independent of the period filter
  const streak = calculateStreak(learningData)
  if (streakElement) streakElement.textContent = streak
}

// Calculate current streak
function calculateStreak(learningData) {
  if (!learningData || learningData.length === 0) return 0

  // Sort by date, newest first
  const sortedData = [...learningData].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Get today's date (without time)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check if studied today
  const latestDate = new Date(sortedData[0].date)
  latestDate.setHours(0, 0, 0, 0)

  if (latestDate.getTime() !== today.getTime() && latestDate.getTime() !== today.getTime() - 24 * 60 * 60 * 1000) {
    // If not studied today or yesterday, streak is broken
    return 0
  }

  // Count consecutive days
  let streak = 1
  let currentDate = latestDate

  for (let i = 1; i < sortedData.length; i++) {
    const date = new Date(sortedData[i].date)
    date.setHours(0, 0, 0, 0)

    const expectedPrevDate = new Date(currentDate)
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1)

    if (date.getTime() === expectedPrevDate.getTime()) {
      streak++
      currentDate = date
    } else {
      break
    }
  }

  return streak
}

// Load saved data from localStorage
function loadSavedData() {
  // Load avatar
  const storedAvatar = localStorage.getItem("userAvatar")
  const avatarImg = document.getElementById("avatar-img")
  if (storedAvatar && avatarImg) {
    avatarImg.src = storedAvatar
  }

  // Load theme preference
  const isDarkMode = localStorage.getItem("darkMode") !== "false" // Default to dark mode
  document.body.classList.toggle("dark-mode", isDarkMode)
  updateThemeIcon(isDarkMode)

  // Load notes
  const quickNotes = document.getElementById("quick-notes")
  const storedNotes = localStorage.getItem("quickNotes")
  if (storedNotes && quickNotes) {
    quickNotes.value = storedNotes
  }
  
  // Load degree progress
  loadDegreeProgress()
}

// Update the theme toggle function to use a more modern design without sun/moon icons
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", isDarkMode)
  updateThemeIcon(isDarkMode)

  // Show a subtle animation when toggling
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.classList.add("theme-toggle-animate")
  setTimeout(() => {
    themeToggle.classList.remove("theme-toggle-animate")
  }, 500)
}

// Update theme icon based on current theme (without using sun/moon icons)
function updateThemeIcon(isDarkMode) {
  const themeIcon = document.querySelector("#theme-toggle i")
  if (themeIcon) {
    // Use a simple circle that changes color instead of sun/moon icons
    themeIcon.className = "fas fa-circle"
    themeIcon.style.color = isDarkMode ? "#ffffff" : "#000000"
  }
}

// Handle avatar file upload
function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    const avatarImg = document.getElementById("avatar-img")
    avatarImg.src = event.target.result
    localStorage.setItem("userAvatar", event.target.result)
  }
  reader.readAsDataURL(file)
}

// Handle chat form submission
function handleChatSubmit(e) {
  e.preventDefault()
  const chatInput = document.getElementById("chat-input")
  const chatContainer = document.getElementById("chat-container")

  if (!chatInput.value.trim()) return

  // Add user message
  addChatMessage("user", chatInput.value)

  // Clear input
  const userMessage = chatInput.value
  chatInput.value = ""

  // Simulate AI response
  setTimeout(() => {
    addChatMessage(
      "system",
      `I'm your electrical engineering assistant. I've noted your query about "${userMessage}". In a real implementation, this would connect to ChatGPT API to provide electrical engineering expertise.`,
    )
  }, 1000)
}

// Add a message to the chat container
function addChatMessage(role, content) {
  const chatContainer = document.getElementById("chat-container")

  const messageDiv = document.createElement("div")
  messageDiv.className = `chat-message ${role}`

  const bubbleDiv = document.createElement("div")
  bubbleDiv.className = "message-bubble"
  bubbleDiv.textContent = content

  messageDiv.appendChild(bubbleDiv)
  chatContainer.appendChild(messageDiv)

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight
}

// Handle Edraw.ai form submission
function handleEdrawSubmit(e) {
  e.preventDefault()
  const edrawPrompt = document.getElementById("edraw-prompt")
  const edrawSubmit = document.getElementById("edraw-submit")
  const edrawResult = document.getElementById("edraw-result")

  if (!edrawPrompt.value.trim()) return

  // Show loading state
  edrawSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'
  edrawSubmit.disabled = true

  // Simulate processing
  setTimeout(() => {
    // Reset button
    edrawSubmit.innerHTML = "Generate Circuit"
    edrawSubmit.disabled = false

    // Show result
    edrawResult.innerHTML = `
      <div class="edraw-generated">
        <h3>Generated Circuit Diagram</h3>
        <p>Based on your prompt: "${edrawPrompt.value}"</p>
        <div class="edraw-diagram">
          <i class="fas fa-microchip" style="font-size: 4rem; opacity: 0.2;"></i>
          <p>In a real implementation, this would display a generated circuit diagram.</p>
        </div>
      </div>
    `
  }, 2000)
}

// Setup course tabs
function setupCourseTabs() {
  const courseTabs = document.querySelectorAll(".course-tab")
  const courseLists = document.querySelectorAll(".course-list")
  
  courseTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-course-tab")
      
      // Update active tab
      courseTabs.forEach(t => t.classList.remove("active"))
      tab.classList.add("active")
      
      // Show selected course list
      courseLists.forEach(list => {
        list.classList.remove("active")
        if (list.id === `${tabName}-courses`) {
          list.classList.add("active")
        }
      })
      
      // If "all" tab is selected, populate it with all courses
      if (tabName === "all") {
        populateAllCourses()
      }
    })
  })
}

// Populate the "All Courses" tab with courses from other tabs
function populateAllCourses() {
  const allCoursesContainer = document.getElementById("all-courses")
  const completedCourses = document.getElementById("completed-courses")
  const currentCourses = document.getElementById("current-courses")
  const plannedCourses = document.getElementById("planned-courses")

  if (!allCoursesContainer) return

  // Clear existing content
  allCoursesContainer.innerHTML = ""

  // Clone and combine all courses
  if (completedCourses) {
    const completed = completedCourses.cloneNode(true)
    const courseItems = completed.querySelectorAll(".course-item")
    courseItems.forEach((item) => {
      const newItem = item.cloneNode(true)
      // Add action buttons
      addCourseActionButtons(newItem)
      allCoursesContainer.appendChild(newItem)
    })
  }

  if (currentCourses) {
    const current = currentCourses.cloneNode(true)
    const courseItems = current.querySelectorAll(".course-item")
    courseItems.forEach((item) => {
      const newItem = item.cloneNode(true)
      // Add action buttons
      addCourseActionButtons(newItem)
      allCoursesContainer.appendChild(newItem)
    })
  }

  if (plannedCourses) {
    const planned = plannedCourses.cloneNode(true)
    const courseItems = planned.querySelectorAll(".course-item")
    courseItems.forEach((item) => {
      const newItem = item.cloneNode(true)
      // Add action buttons
      addCourseActionButtons(newItem)
      allCoursesContainer.appendChild(newItem)
    })
  }
  
  // Add event listeners to the new items
  addCourseItemListeners()
}

// Setup degree progress functionality
function setupDegreeProgress() {
  const updateProgressBtn = document.getElementById("update-progress")
  if (updateProgressBtn) {
    updateProgressBtn.addEventListener("click", updateDegreeProgress)
  }
  
  // Add input event listeners to update in real-time
  const creditsEarned = document.getElementById("credits-earned")
  const creditsRemaining = document.getElementById("credits-remaining")
  const currentGpa = document.getElementById("current-gpa")
  
  if (creditsEarned && creditsRemaining && currentGpa) {
    creditsEarned.addEventListener("input", updateProgressDisplay)
    creditsRemaining.addEventListener("input", updateProgressDisplay)
    currentGpa.addEventListener("input", updateProgressDisplay)
  }
}

// Update degree progress
function updateDegreeProgress() {
  const creditsEarned = document.getElementById("credits-earned").value
  const creditsRemaining = document.getElementById("credits-remaining").value
  const currentGpa = document.getElementById("current-gpa").value
  
  // Save to localStorage
  const degreeProgress = {
    creditsEarned,
    creditsRemaining,
    currentGpa
  }
  
  localStorage.setItem("degreeProgress", JSON.stringify(degreeProgress))
  
  // Update display
  updateProgressDisplay()
  
  showToast("Degree progress updated successfully!")
}

// Update progress display
function updateProgressDisplay() {
  const creditsEarned = parseInt(document.getElementById("credits-earned").value) || 0
  const creditsRemaining = parseInt(document.getElementById("credits-remaining").value) || 0
  const currentGpa = parseFloat(document.getElementById("current-gpa").value) || 0
  
  const totalCredits = creditsEarned + creditsRemaining
  const percentComplete = Math.round((creditsEarned / totalCredits) * 100)
  
  // Update progress bar
  const progressFill = document.querySelector(".progress-fill")
  if (progressFill) {
    progressFill.style.width = `${percentComplete}%`
  }
  
  // Update stats
  const percentageElement = document.getElementById("progress-percentage")
  const creditsEarnedDisplay = document.getElementById("credits-earned-display")
  const creditsRemainingDisplay = document.getElementById("credits-remaining-display")
  const gpaDisplay = document.getElementById("gpa-display")
  
  if (percentageElement) percentageElement.textContent = `${percentComplete}%`
  if (creditsEarnedDisplay) creditsEarnedDisplay.textContent = creditsEarned
  if (creditsRemainingDisplay) creditsRemainingDisplay.textContent = creditsRemaining
  if (gpaDisplay) gpaDisplay.textContent = currentGpa.toFixed(1)
}

// Load degree progress from localStorage
function loadDegreeProgress() {
  const savedProgress = JSON.parse(localStorage.getItem("degreeProgress") || "{}")
  
  const creditsEarned = document.getElementById("credits-earned")
  const creditsRemaining = document.getElementById("credits-remaining")
  const currentGpa = document.getElementById("current-gpa")
  
  if (savedProgress.creditsEarned && creditsEarned) {
    creditsEarned.value = savedProgress.creditsEarned
  }
  
  if (savedProgress.creditsRemaining && creditsRemaining) {
    creditsRemaining.value = savedProgress.creditsRemaining
  }
  
  if (savedProgress.currentGpa && currentGpa) {
    currentGpa.value = savedProgress.currentGpa
  }
  
  // Update display
  updateProgressDisplay()
}

// Open modal
function openModal(modal) {
  if (modal) {
    modal.classList.add("active")
  }
}

// Close modal
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("active")
  }
}

// Add event listeners to course items
function addCourseItemListeners() {
  const courseItems = document.querySelectorAll(".course-item")
  courseItems.forEach(item => {
    const editBtn = item.querySelector(".edit-btn")
    const deleteBtn = item.querySelector(".delete-btn")
    
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const courseId = item.dataset.id
        editCourse(courseId)
      })
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const courseId = item.dataset.id
        deleteCourse(courseId)
      })
    }
  })
}

// Add event listeners to study set items
function addStudySetItemListeners() {
  const studySetItems = document.querySelectorAll(".study-set-item")
  studySetItems.forEach(item => {
    // Add click event to study the set
    item.addEventListener("click", () => {
      const setId = item.dataset.id
      studySet(setId)
    })
    
    const editBtn = item.querySelector(".edit-btn")
    const deleteBtn = item.querySelector(".delete-btn")
    
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const setId = item.dataset.id
        editStudySet(setId)
      })
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const setId = item.dataset.id
        deleteStudySet(setId)
      })
    }
  })
}

// Add event listeners to circuit items
function addCircuitItemListeners() {
  const circuitItems = document.querySelectorAll(".circuit-item")
  circuitItems.forEach(item => {
    // Add click event to open circuit
    item.addEventListener("click", () => {
      const circuitId = item.dataset.id
      openCircuit(circuitId)
    })
    
    const editBtn = item.querySelector(".edit-btn")
    const deleteBtn = item.querySelector(".delete-btn")
    
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const circuitId = item.dataset.id
        editCircuit(circuitId)
      })
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const circuitId = item.dataset.id
        deleteCircuit(circuitId)
      })
    }
  })
}

// Add course action buttons
function addCourseActionButtons(courseItem) {
  // Create actions container if it doesn't exist
  let actionsDiv = courseItem.querySelector(".item-actions")
  if (!actionsDiv) {
    actionsDiv = document.createElement("div")
    actionsDiv.className = "item-actions"
    courseItem.appendChild(actionsDiv)
  }

  // Clear existing buttons
  actionsDiv.innerHTML = ""

  // Create edit button
  const editBtn = document.createElement("button")
  editBtn.className = "edit-btn"
  editBtn.innerHTML = '<i class="fas fa-edit"></i>'
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    const courseId = courseItem.dataset.id
    editCourse(courseId)
  })

  // Create delete button
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    const courseId = courseItem.dataset.id
    deleteCourse(courseId)
  })

  actionsDiv.appendChild(editBtn)
  actionsDiv.appendChild(deleteBtn)
}

// Handle adding a new course
function handleAddCourse() {
  const courseCode = document.getElementById("course-code").value
  const courseTitle = document.getElementById("course-title").value
  const courseCredits = document.getElementById("course-credits").value
  const courseStatus = document.getElementById("course-status").value
  const courseGrade = document.getElementById("course-grade").value
  const courseSemester = document.getElementById("course-semester").value

  if (!courseCode || !courseTitle || !courseCredits) {
    showToast("Please fill in all required fields")
    return
  }

  // Create course object
  const course = {
    id: Date.now().toString(),
    code: courseCode,
    title: courseTitle,
    credits: courseCredits,
    status: courseStatus,
    grade: courseStatus === "completed" ? courseGrade : "",
    semester: courseStatus === "planned" ? courseSemester : "",
  }

  // Save to localStorage
  const savedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
  savedCourses.push(course)
  localStorage.setItem("courses", JSON.stringify(savedCourses))

  // Create and add course item to the DOM
  const courseItem = createCourseItem(course)
  const targetList = document.getElementById(`${courseStatus}-courses`)
  if (targetList) {
    targetList.appendChild(courseItem)
  }

  // Add event listeners to the new item
  addCourseItemListeners()

  // Close modal and reset form
  closeModal(document.getElementById("add-course-modal"))
  document.getElementById("add-course-form").reset()

  // Show success message
  showToast("Course added successfully!")
}

// Create a course item element
function createCourseItem(course) {
  const courseItem = document.createElement("div")
  courseItem.className = "course-item"
  courseItem.dataset.id = course.id

  const courseCodeDiv = document.createElement("div")
  courseCodeDiv.className = "course-code"
  courseCodeDiv.textContent = course.code

  const courseDetailsDiv = document.createElement("div")
  courseDetailsDiv.className = "course-details"

  const courseTitleDiv = document.createElement("div")
  courseTitleDiv.className = "course-title"
  courseTitleDiv.textContent = course.title

  const courseMetaDiv = document.createElement("div")
  courseMetaDiv.className = "course-meta"

  const courseCreditsSpan = document.createElement("span")
  courseCreditsSpan.className = "course-credits"
  courseCreditsSpan.textContent = `${course.credits} credits`

  const courseStatusSpan = document.createElement("span")

  if (course.status === "completed") {
    courseStatusSpan.className = "course-grade"
    courseStatusSpan.textContent = course.grade
  } else if (course.status === "current") {
    courseStatusSpan.className = "course-progress"
    courseStatusSpan.textContent = "In Progress"
  } else {
    courseStatusSpan.className = "course-semester"
    courseStatusSpan.textContent = course.semester
  }

  courseMetaDiv.appendChild(courseCreditsSpan)
  courseMetaDiv.appendChild(courseStatusSpan)

  courseDetailsDiv.appendChild(courseTitleDiv)
  courseDetailsDiv.appendChild(courseMetaDiv)

  courseItem.appendChild(courseCodeDiv)
  courseItem.appendChild(courseDetailsDiv)

  // Add action buttons
  addCourseActionButtons(courseItem)

  return courseItem
}

// Delete a course
function deleteCourse(courseId) {
  if (confirm("Are you sure you want to delete this course?")) {
    // Remove from localStorage
    const savedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
    const updatedCourses = savedCourses.filter((course) => course.id !== courseId)
    localStorage.setItem("courses", JSON.stringify(updatedCourses))

    // Remove from DOM
    const courseItem = document.querySelector(`.course-item[data-id="${courseId}"]`)
    if (courseItem) {
      courseItem.remove()
    }

    showToast("Course deleted successfully!")
  }
}

// Edit a course
function editCourse(courseId) {
  showToast("Edit course feature coming soon!")
  // In a real implementation, this would open a modal to edit the course
}

// Setup flashcards
function setupFlashcards() {
  // Load saved flashcards
  loadFlashcards()
  
  // Add event listener to study button
  const studyBtn = document.getElementById("study-btn")
  if (studyBtn) {
    studyBtn.addEventListener("click", () => {
      const flashcardContainer = document.getElementById("flashcard-container")
      const quizContainer = document.getElementById("quiz-container")
      
      if (flashcardContainer) flashcardContainer.style.display = "block"
      if (quizContainer) quizContainer.style.display = "none"
    })
  }
}

// Load saved flashcards
function loadFlashcards() {
  const flashcardContainer = document.querySelector(".flashcard-container")
  if (!flashcardContainer) return

  const savedFlashcards = JSON.parse(localStorage.getItem("flashcards") || "[]")

  if (savedFlashcards.length === 0) {
    // Add default flashcards if none exist
    const defaultFlashcards = [
      {
        term: "Impedance",
        definition:
          "The measure of opposition that a circuit presents to a current when a voltage is applied. It is a complex quantity consisting of resistance and reactance.",
      },
      {
        term: "Capacitor",
        definition: "A passive two-terminal electrical component that stores electrical energy in an electric field.",
      },
      {
        term: "Inductor",
        definition:
          "A passive two-terminal electrical component that stores energy in a magnetic field when electric current flows through it.",
      },
    ]
    localStorage.setItem("flashcards", JSON.stringify(defaultFlashcards))

    // Use the default flashcards
    currentFlashcardIndex = 0
    updateFlashcardDisplay(defaultFlashcards)
  } else {
    // Use saved flashcards
    currentFlashcardIndex = 0
    updateFlashcardDisplay(savedFlashcards)
  }
}

// Global variable to track current flashcard
let currentFlashcardIndex = 0

// Update flashcard display
function updateFlashcardDisplay(flashcards) {
  if (!flashcards || flashcards.length === 0) return

  const flashcard = document.querySelector(".flashcard")
  const cardCounter = document.getElementById("card-counter")

  if (flashcard && cardCounter) {
    const front = flashcard.querySelector(".flashcard-front h3")
    const back = flashcard.querySelector(".flashcard-back p")

    if (front && back) {
      front.textContent = flashcards[currentFlashcardIndex].term
      back.textContent = flashcards[currentFlashcardIndex].definition
      cardCounter.textContent = `${currentFlashcardIndex + 1}/${flashcards.length}`

      // Reset flip state
      flashcard.classList.remove("flipped")
    }
  }
}

// Navigate flashcards
function navigateFlashcard(direction) {
  const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]")

  if (flashcards.length === 0) return

  if (direction === "prev") {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length
  } else {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length
  }

  updateFlashcardDisplay(flashcards)
}

// Add a new term field to the create study set form
function addNewTerm() {
  const vocabTerms = document.querySelector(".vocab-terms")
  const termCount = vocabTerms.querySelectorAll(".vocab-term").length + 1

  const newTerm = document.createElement("div")
  newTerm.className = "vocab-term"

  newTerm.innerHTML = `
    <div class="form-group">
      <label>Term ${termCount}</label>
      <input type="text" class="term-input" placeholder="e.g., Resistor" required>
    </div>
    <div class="form-group">
      <label>Definition</label>
      <textarea class="definition-input" placeholder="e.g., A passive two-terminal electrical component that implements electrical resistance" required></textarea>
    </div>
  `

  vocabTerms.appendChild(newTerm)
}

// Handle creating a new study set
function handleCreateStudySet() {
  const setTitle = document.getElementById("set-title").value
  const setDescription = document.getElementById("set-description").value
  const termInputs = document.querySelectorAll(".term-input")
  const definitionInputs = document.querySelectorAll(".definition-input")

  if (!setTitle) {
    showToast("Please enter a title for your study set")
    return
  }

  if (termInputs.length === 0) {
    showToast("Please add at least one term to your study set")
    return
  }

  // Create flashcards array
  const flashcards = []
  for (let i = 0; i < termInputs.length; i++) {
    const term = termInputs[i].value.trim()
    const definition = definitionInputs[i].value.trim()

    if (term && definition) {
      flashcards.push({ term, definition })
    }
  }

  if (flashcards.length === 0) {
    showToast("Please add at least one valid term and definition")
    return
  }

  // Create study set object
  const studySet = {
    id: Date.now().toString(),
    title: setTitle,
    description: setDescription,
    terms: flashcards.length,
    lastStudied: new Date().toISOString(),
    flashcards: flashcards,
  }

  // Save to localStorage
  const savedStudySets = JSON.parse(localStorage.getItem("studySets") || "[]")
  savedStudySets.push(studySet)
  localStorage.setItem("studySets", JSON.stringify(savedStudySets))

  // Save flashcards separately for easy access
  localStorage.setItem("flashcards", JSON.stringify(flashcards))

  // Add the new set to the DOM
  const studySetList = document.querySelector(".study-set-list")
  if (studySetList) {
    const newSet = createStudySetItem(studySet)
    studySetList.insertBefore(newSet, studySetList.firstChild)
  }

  // Update flashcard display
  currentFlashcardIndex = 0
  updateFlashcardDisplay(flashcards)

  // Close modal and reset form
  closeModal(document.getElementById("create-set-modal"))
  document.getElementById("create-set-form").reset()

  // Clear all terms except the first two
  const vocabTerms = document.querySelector(".vocab-terms")
  const terms = vocabTerms.querySelectorAll(".vocab-term")
  for (let i = 2; i < terms.length; i++) {
    terms[i].remove()
  }

  showToast("Study set created successfully!")
}

// Create a study set item element
function createStudySetItem(studySet) {
  const studySetItem = document.createElement("div")
  studySetItem.className = "study-set-item"
  studySetItem.dataset.id = studySet.id

  const studySetTitle = document.createElement("div")
  studySetTitle.className = "study-set-title"
  studySetTitle.textContent = studySet.title

  const studySetMeta = document.createElement("div")
  studySetMeta.className = "study-set-meta"

  const termCount = document.createElement("span")
  termCount.textContent = `${studySet.terms} terms`

  const lastStudied = document.createElement("span")
  const date = new Date(studySet.lastStudied)
  const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  lastStudied.textContent = `Last studied: ${daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : daysAgo + " days ago"}`

  studySetMeta.appendChild(termCount)
  studySetMeta.appendChild(lastStudied)

  studySetItem.appendChild(studySetTitle)
  studySetItem.appendChild(studySetMeta)

  // Add action buttons
  const actionsDiv = document.createElement("div")
  actionsDiv.className = "item-actions"

  const editBtn = document.createElement("button")
  editBtn.className = "edit-btn"
  editBtn.innerHTML = '<i class="fas fa-edit"></i>'
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    editStudySet(studySet.id)
  })

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    deleteStudySet(studySet.id)
  })

  actionsDiv.appendChild(editBtn)
  actionsDiv.appendChild(deleteBtn)
  studySetItem.appendChild(actionsDiv)

  // Add click event to study the set
  studySetItem.addEventListener("click", () => {
    studySet(studySet.id)
  })

  return studySetItem
}

// Study a set
function studySet(setId) {
  const savedStudySets = JSON.parse(localStorage.getItem("studySets") || "[]")
  const studySet = savedStudySets.find((set) => set.id === setId)

  if (!studySet) return

  // Update last studied date
  studySet.lastStudied = new Date().toISOString()
  localStorage.setItem("studySets", JSON.stringify(savedStudySets))

  // Update the DOM
  const studySetItem = document.querySelector(`.study-set-item[data-id="${setId}"]`)
  if (studySetItem) {
    const lastStudied = studySetItem.querySelector(".study-set-meta span:last-child")
    if (lastStudied) {
      lastStudied.textContent = "Last studied: Today"
    }
  }

  // Load flashcards if available
  if (studySet.flashcards && studySet.flashcards.length > 0) {
    localStorage.setItem("flashcards", JSON.stringify(studySet.flashcards))
    currentFlashcardIndex = 0
    updateFlashcardDisplay(studySet.flashcards)

    // Show flashcard container
    const flashcardContainer = document.querySelector(".flashcard-container")
    if (flashcardContainer) {
      flashcardContainer.style.display = "block"
    }

    // Hide quiz container
    const quizContainer = document.getElementById("quiz-container")
    if (quizContainer) {
      quizContainer.style.display = "none"
    }

    // Switch to vocab tab if not already there
    const vocabTab = document.querySelector('.tab-btn[data-tab="vocab"]')
    if (vocabTab) {
      vocabTab.click()
    }

    showToast(`Now studying: ${studySet.title}`)
  } else {
    showToast("This study set has no flashcards. Please add some first.")
  }
}

// Edit a study set
function editStudySet(setId) {
  showToast("Edit study set feature coming soon!")
}

// Delete a study set
function deleteStudySet(setId) {
  if (confirm("Are you sure you want to delete this study set?")) {
    // Remove from localStorage
    const savedStudySets = JSON.parse(localStorage.getItem("studySets") || "[]")
    const updatedStudySets = savedStudySets.filter((set) => set.id !== setId)
    localStorage.setItem("studySets", JSON.stringify(updatedStudySets))

    // Remove from DOM
    const studySetItem = document.querySelector(`.study-set-item[data-id="${setId}"]`)
    if (studySetItem) {
      studySetItem.remove()
    }

    showToast("Study set deleted successfully!")
  }
}

// Setup Quiz Mode
function setupQuizMode() {
  const quizBtn = document.getElementById("quiz-btn")
  if (!quizBtn) return

  quizBtn.addEventListener("click", startQuizMode)
}

// Start Quiz Mode
function startQuizMode() {
  // Get current flashcards
  const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]")

  if (flashcards.length === 0) {
    showToast("No flashcards available for quiz mode")
    return
  }

  // Create quiz container if it doesn't exist
  let quizContainer = document.getElementById("quiz-container")

  if (!quizContainer) {
    quizContainer = document.createElement("div")
    quizContainer.id = "quiz-container"
    quizContainer.className = "quiz-container"

    // Add to DOM
    const flashcardContainer = document.querySelector(".flashcard-container")
    if (flashcardContainer) {
      flashcardContainer.parentNode.insertBefore(quizContainer, flashcardContainer.nextSibling)
    }
  }

  // Hide flashcard container
  const flashcardContainer = document.querySelector(".flashcard-container")
  if (flashcardContainer) {
    flashcardContainer.style.display = "none"
  }

  // Show quiz container
  quizContainer.style.display = "block"

  // Initialize quiz
  initializeQuiz(quizContainer, flashcards)
}

// Initialize Quiz
function initializeQuiz(container, flashcards) {
  // Shuffle flashcards
  const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5)

  // Take first 5 cards or all if less than 5
  const quizCards = shuffledCards.slice(0, Math.min(5, shuffledCards.length))

  // Initialize quiz state
  const quizState = {
    cards: quizCards,
    currentIndex: 0,
    score: 0,
    answers: [],
  }

  // Save quiz state
  localStorage.setItem("currentQuiz", JSON.stringify(quizState))

  // Show first question
  showQuizQuestion(container, quizState)
}

// Show Quiz Question
function showQuizQuestion(container, quizState) {
  const currentCard = quizState.cards[quizState.currentIndex]

  // Create options (correct answer + 3 random wrong answers)
  const allDefinitions = JSON.parse(localStorage.getItem("flashcards") || "[]")
    .map((card) => card.definition)
    .filter((def) => def !== currentCard.definition)

  // Shuffle and take 3 wrong answers
  const wrongAnswers = allDefinitions.sort(() => Math.random() - 0.5).slice(0, 3)

  // All options (correct + wrong)
  const options = [currentCard.definition, ...wrongAnswers].sort(() => Math.random() - 0.5)

  // Create HTML
  let html = `
    <div class="quiz-question">
      <div class="quiz-progress">Question ${quizState.currentIndex + 1} of ${quizState.cards.length}</div>
      <h3 class="quiz-term">${currentCard.term}</h3>
      <div class="quiz-options">
  `

  options.forEach((option, index) => {
    html += `
      <div class="quiz-option" data-index="${index}" data-value="${option}">
        <span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span>
        <span class="quiz-option-text">${option}</span>
      </div>
    `
  })

  html += `
      </div>
    </div>
  `

  // Set container content
  container.innerHTML = html

  // Add click events to options
  const optionElements = container.querySelectorAll(".quiz-option")
  optionElements.forEach((option) => {
    option.addEventListener("click", () => {
      handleQuizAnswer(option, currentCard.definition, quizState, container)
    })
  })
}

// Handle Quiz Answer
function handleQuizAnswer(selectedOption, correctAnswer, quizState, container) {
  const selectedValue = selectedOption.getAttribute("data-value")
  const isCorrect = selectedValue === correctAnswer

  // Update UI to show correct/incorrect
  const options = container.querySelectorAll(".quiz-option")
  options.forEach((option) => {
    const optionValue = option.getAttribute("data-value")

    if (optionValue === correctAnswer) {
      option.classList.add("correct")
    } else if (option === selectedOption) {
      option.classList.add("incorrect")
    }

    // Disable all options
    option.style.pointerEvents = "none"
  })

  // Update quiz state
  quizState.answers.push({
    term: quizState.cards[quizState.currentIndex].term,
    selectedAnswer: selectedValue,
    correctAnswer: correctAnswer,
    isCorrect: isCorrect,
  })

  if (isCorrect) {
    quizState.score++
  }

  // Save updated state
  localStorage.setItem("currentQuiz", JSON.stringify(quizState))

  // Show next button
  const nextButton = document.createElement("button")
  nextButton.className = "btn btn-primary quiz-next-btn"
  nextButton.textContent = quizState.currentIndex < quizState.cards.length - 1 ? "Next Question" : "See Results"
  nextButton.addEventListener("click", () => {
    if (quizState.currentIndex < quizState.cards.length - 1) {
      // Show next question
      quizState.currentIndex++
      localStorage.setItem("currentQuiz", JSON.stringify(quizState))
      showQuizQuestion(container, quizState)
    } else {
      // Show results
      showQuizResults(container, quizState)
    }
  })

  container.appendChild(nextButton)
}

// Show Quiz Results
function showQuizResults(container, quizState) {
  const percentage = Math.round((quizState.score / quizState.cards.length) * 100)

  let html = `
    <div class="quiz-results">
      <h2>Quiz Results</h2>
      <div class="quiz-score">${percentage}%</div>
      <p>You got ${quizState.score} out of ${quizState.cards.length} questions correct</p>
      
      <div class="quiz-answers">
        <h3>Your Answers</h3>
  `

  quizState.answers.forEach((answer, index) => {
    html += `
      <div class="quiz-answer ${answer.isCorrect ? "correct" : "incorrect"}">
        <div class="quiz-answer-term">${index + 1}. ${answer.term}</div>
        <div class="quiz-answer-result">
          ${
            answer.isCorrect
              ? `<i class="fas fa-check"></i> Correct`
              : `<i class="fas fa-times"></i> Incorrect<br>
             <small>Your answer: ${answer.selectedAnswer}</small><br>
             <small>Correct answer: ${answer.correctAnswer}</small>`
          }
        </div>
      </div>
    `
  })

  html += `
      </div>
      
      <div class="quiz-actions">
        <button id="retry-quiz-btn" class="btn btn-outline">Try Again</button>
        <button id="return-study-btn" class="btn btn-primary">Return to Study</button>
      </div>
    </div>
  `

  container.innerHTML = html

  // Add event listeners
  document.getElementById("retry-quiz-btn").addEventListener("click", () => {
    // Reset quiz with same flashcards
    const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]")
    initializeQuiz(container, flashcards)
  })

  document.getElementById("return-study-btn").addEventListener("click", () => {
    // Hide quiz container
    container.style.display = "none"

    // Show flashcard container
    const flashcardContainer = document.querySelector(".flashcard-container")
    if (flashcardContainer) {
      flashcardContainer.style.display = "block"
    }
  })

  // Save learning data
  saveLearningData(quizState)
}

// Save learning data for progress tracking
function saveLearningData(quizState) {
  const learningData = JSON.parse(localStorage.getItem("learningData") || "[]")

  const newEntry = {
    date: new Date().toISOString(),
    type: "quiz",
    termsStudied: quizState.cards.length,
    correctAnswers: quizState.score,
    totalAnswers: quizState.cards.length,
  }

  learningData.push(newEntry)
  localStorage.setItem("learningData", JSON.stringify(learningData))

  // Update progress display
  updateLearningProgress()
}

// Setup Circuit Designs
function setupCircuitDesigns() {
  // Add event listener to create circuit button
  const createCircuitBtn = document.querySelector(".card-footer .btn-primary.btn-full")
  if (createCircuitBtn && createCircuitBtn.textContent.includes("Create New Circuit")) {
    createCircuitBtn.addEventListener("click", openCreateCircuitModal)
  }
}

// Open create circuit modal
function openCreateCircuitModal() {
  openModal(document.getElementById("create-circuit-modal"))
}

// Open a circuit
function openCircuit(circuitId) {
  showToast(`Opening circuit with ID: ${circuitId}`)
  // In a real implementation, this would open a detailed view of the circuit
}

// Edit a circuit
function editCircuit(circuitId) {
  showToast(`Editing circuit with ID: ${circuitId}`)
  // In a real implementation, this would open a modal to edit the circuit details
}

// Delete a circuit
function deleteCircuit(circuitId) {
  if (confirm("Are you sure you want to delete this circuit?")) {
    // Remove from localStorage
    const savedCircuits = JSON.parse(localStorage.getItem("circuits") || "[]")
    const updatedCircuits = savedCircuits.filter((circuit) => circuit.id !== circuitId)
    localStorage.setItem("circuits", JSON.stringify(updatedCircuits))

    // Remove from DOM
    const circuitItem = document.querySelector(`.circuit-item[data-id="${circuitId}"]`)
    if (circuitItem) {
      circuitItem.remove()
    }

    showToast("Circuit deleted successfully!")
  }
}

// Setup Electrical Tools
function setupElectricalTools() {
  // Add event listener to voltage divider calculator
  const voltageDividerBtn = document.getElementById("voltage-divider-btn")
  if (voltageDividerBtn) {
    voltageDividerBtn.addEventListener("click", openVoltageDividerCalculator)
  }

  // Add event listener to resistor color code calculator
  const resistorColorCodeBtn = document.getElementById("resistor-color-code-btn")
  if (resistorColorCodeBtn) {
    resistorColorCodeBtn.addEventListener("click", openResistorColorCodeCalculator)
  }
  
  // Add event listeners to other tools
  const ohmsLawBtn = document.getElementById("ohms-law-btn")
  if (ohmsLawBtn) {
    ohmsLawBtn.addEventListener("click", openOhmsLawCalculator)
  }
  
  const ledResistorBtn = document.getElementById("led-resistor-btn")
  if (ledResistorBtn) {
    ledResistorBtn.addEventListener("click", openLedResistorCalculator)
  }
}

// Open voltage divider calculator
function openVoltageDividerCalculator() {
  showToast("Voltage Divider Calculator coming soon!")
  // In a real implementation, this would open a modal with a voltage divider calculator
}

// Open resistor color code calculator
function openResistorColorCodeCalculator() {
  showToast("Resistor Color Code Calculator coming soon!")
  // In a real implementation, this would open a modal with a resistor color code calculator
}

// Open Ohm's Law calculator
function openOhmsLawCalculator() {
  showToast("Ohm's Law Calculator coming soon!")
  // In a real implementation, this would open a modal with an Ohm's Law calculator
}

// Open LED resistor calculator
function openLedResistorCalculator() {
  showToast("LED Resistor Calculator coming soon!")
  // In a real implementation, this would open a modal with an LED resistor calculator
}

// Setup Electrical Engineering Resources
function setupResources() {
  // Add event listeners to resource items
  const resourceItems = document.querySelectorAll(".resource-item")
  resourceItems.forEach(item => {
    const link = item.querySelector(".resource-link")
    if (link) {
      link.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }
  })
}

// Load saved course lists
function loadSavedCourseLists() {
  // Load saved courses from localStorage
  const savedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
  
  if (savedCourses.length > 0) {
    // Clear existing courses
    document.querySelectorAll(".course-list").forEach(list => {
      list.innerHTML = ""
    })
    
    // Add saved courses to appropriate lists
    savedCourses.forEach(course => {
      const courseItem = createCourseItem(course)
      const targetList = document.getElementById(`${course.status}-courses`)
      if (targetList) {
        targetList.appendChild(courseItem)
      }
    })
    
    // Add event listeners to course items
    addCourseItemListeners()
  }
}

// Make customizable sections editable
function setupCustomizableSections() {
  const sections = [
    { id: "degree-progress", title: "Degree Progress" },
    { id: "degree-requirements", title: "Degree Requirements" },
    { id: "graduation-plan", title: "Graduation Plan" }
  ]
  
  sections.forEach(section => {
    const editBtn = document.querySelector(`#${section.id} .edit-section-btn`)
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        openSectionEditor(section.id, section.title)
      })
    }
  })
}

// Open section editor
function openSectionEditor(sectionId, sectionTitle) {
  // Get current content
  const sectionElement = document.getElementById(sectionId)
  const contentContainer = sectionElement.querySelector(".section-content")
  const currentContent = contentContainer ? contentContainer.innerHTML : ""
  
  // Fill form
  document.getElementById("section-editor-title").textContent = `Edit ${sectionTitle}`
  document.getElementById("section-editor-id").value = sectionId
  document.getElementById("section-editor-content").value = currentContent
  
  // Open modal
  openModal(document.getElementById("section-editor-modal"))
}

// Save section content
function saveSectionContent() {
  const sectionId = document.getElementById("section-editor-id").value
  const content = document.getElementById("section-editor-content").value
  
  // Save to localStorage
  localStorage.setItem(`${sectionId}Content`, content)
  
  // Update UI
  const sectionElement = document.getElementById(sectionId)
  if (sectionElement) {
    let contentContainer = sectionElement.querySelector(".section-content")
    
    if (!contentContainer) {
      contentContainer = document.createElement("div")
      contentContainer.className = "section-content"
      sectionElement.appendChild(contentContainer)
    }
    
    contentContainer.innerHTML = content
  }
  
  // Close modal
  closeModal(document.getElementById("section-editor-modal"))
  
  showToast("Section updated successfully!")
}

// Load popular content
function loadPopularContent(forceRefresh = false) {
  const popularContainer = document.getElementById("popular-currently")
  if (!popularContainer) return

  // Check if we need to refresh (daily or forced)
  const lastRefresh = localStorage.getItem("popularContentLastRefresh")
  const now = new Date()
  const today = now.toDateString()

  if (!forceRefresh && lastRefresh === today) {
    // Use cached content if refreshed today
    const cachedContent = localStorage.getItem("popularContent")
    if (cachedContent) {
      popularContainer.innerHTML = cachedContent
      return
    }
  }

  // Show loading state
  popularContainer.innerHTML = '<div class="loading">Loading latest content...</div>'

  // In a real implementation, this would fetch from an API
  // For demo purposes, we'll simulate fetching new content
  setTimeout(() => {
    const popularItems = [
      {
        title: "New Advances in Power Electronics",
        source: "IEEE Spectrum",
        url: "https://spectrum.ieee.org/",
      },
      {
        title: "Circuit Design Optimization Techniques",
        source: "All About Circuits",
        url: "https://www.allaboutcircuits.com/",
      },
      {
        title: "Microcontroller Programming Best Practices",
        source: "Embedded.com",
        url: "https://www.embedded.com/",
      },
      {
        title: "Energy Efficient Circuit Design",
        source: "Electronics Weekly",
        url: "https://www.electronicsweekly.com/",
      },
    ]

    // Randomize the order to simulate "new" content
    popularItems.sort(() => Math.random() - 0.5)

    let html = `
      <div class="popular-currently-header">
        <h3>Popular Currently</h3>
        <i id="refresh-popular" class="fas fa-sync-alt refresh-icon"></i>
      </div>
    `

    popularItems.forEach((item) => {
      html += `
        <div class="popular-item" data-url="${item.url}">
          <div class="popular-item-title">${item.title}</div>
          <div class="popular-item-source">${item.source}</div>
        </div>
      `
    })

    popularContainer.innerHTML = html

    // Add click events to items
    const items = popularContainer.querySelectorAll(".popular-item")
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const url = item.getAttribute("data-url")
        if (url) window.open(url, "_blank")
      })
    })

    // Add click event to refresh button
    const refreshBtn = document.getElementById("refresh-popular")
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        loadPopularContent(true)
      })
    }

    // Save to localStorage
    localStorage.setItem("popularContent", html)
    localStorage.setItem("popularContentLastRefresh", today)
  }, 1000)
}

// Show a toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement("div")
  toast.className = "toast"
  toast.textContent = message

  // Add toast styles
  toast.style.position = "fixed"
  toast.style.bottom = "20px"
  toast.style.right = "20px"
  toast.style.padding = "10px 20px"
  toast.style.backgroundColor = "var(--card)"
  toast.style.color = "var(--foreground)"
  toast.style.borderRadius = "var(--radius)"
  toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
  toast.style.zIndex = "1000"
  toast.style.animation = "fadeIn 0.3s, fadeOut 0.3s 2.7s"

  // Add to document
  document.body.appendChild(toast)

  // Remove after 3 seconds
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}