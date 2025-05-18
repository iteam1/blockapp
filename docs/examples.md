# Data Structure

Here's how you could design workflows using **AgenticFlow** in three formats: **chain**, **tree**, and **graph**, based on your description. These examples assume the context of a **customer support automation agent**.

---

## 🔗 CHAIN WORKFLOW (Linear)

Each step leads directly to the next.

### **Use Case**: Automated issue resolution for customer complaints.

```
User Request --> Identify Intent --> Retrieve Customer Data --> Query Knowledge Base --> Generate Resolution --> Send Response
```

### **Structure**:

1. **Identify Intent**

   * Input: user request
   * Output: intent ("refund request", "technical issue", etc.)

2. **Retrieve Customer Data**

   * Input: intent + user ID
   * Output: profile data, purchase history

3. **Query Knowledge Base**

   * Input: intent + profile data
   * Output: possible solutions

4. **Generate Resolution**

   * Input: solutions
   * Output: suggested message

5. **Send Response**

   * Input: message
   * Output: delivered to user

---

## 🌳 TREE WORKFLOW (Branching)

One step leads to multiple possible paths.

### **Use Case**: Technical support with multiple issue types.

```
                            Identify Intent
                                  |
        -------------------------------------------------
        |                        |                       |
     Software Issue        Hardware Issue          Billing Issue
        |                        |                       |
Run Diagnostics        Check Warranty Status        Fetch Invoice
        |                        |                       |
Suggest Fix              Recommend Repair          Offer Refund Options
```

### **Structure**:

1. **Identify Intent**
2. Depending on intent:

   * Software Issue:

     * Run diagnostics → Suggest fix
   * Hardware Issue:

     * Check warranty → Recommend repair
   * Billing Issue:

     * Fetch invoice → Offer refund options

Each branch acts like a subtree with its own linear steps.

---

## 🔁 GRAPH WORKFLOW (Flexible & Re-entrant)

Steps can have multiple inputs/outputs and be revisited—useful for complex reasoning or iterative decisions.

### **Use Case**: Product recommendation engine that loops until optimal suggestions are accepted.

```
                    +-------------------------+
                    |     User Preferences    |
                    +-------------------------+
                                |
                                v
                    +-------------------------+
                    |   Generate Suggestions  |
                    +-------------------------+
                                |
                                v
                    +-------------------------+
                    |    Get User Feedback    |
                    +-------------------------+
                     ^                        |
                     |                        v
     +-------------------------+     +-------------------------+
     |    Adjust Preferences   |<----|   Check Satisfaction    |
     +-------------------------+     +-------------------------+
                     |                        |
                     +------------------------+
```

### **Structure**:

1. Gather **user preferences** (e.g., price range, category)
2. **Generate suggestions** (e.g., top 3 products)
3. **Get feedback** on suggestions
4. **Check satisfaction**:

   * If satisfied → end
   * Else → adjust preferences and loop

This graph allows cyclical execution and dynamic decision paths.

# Directionality

In **AgenticFlow**, the lines between steps (contexts) can be **both**:

### 🔄 **Bi-directional** or 🔁 **Re-entrant** — in **graph workflows**

* Used when workflows need **feedback loops**, **backtracking**, or **re-evaluation**.
* Example: Monte Carlo Tree Search, where nodes are revisited and updated.
* Example: A recommendation engine that loops through preferences based on user feedback.

### ➡️ **One-directional** — in **chain or tree workflows**

* Used when tasks are strictly **sequential** or **branching forward only**.
* Example: Intent recognition → data retrieval → response generation.
* Useful when no backtracking is needed.

---

### 🧠 Agentic Implication:

Since AgenticFlow supports **strategic planning algorithms** (like DFS, MCTS), it must support **bi-directional or cyclic graph traversals**, especially in learning or optimization phases.

So, the framework **supports both**, and the **directionality is determined by the workflow type and application logic**.

Let me know if you'd like a diagram or code snippet showing bi-directional context flows.

