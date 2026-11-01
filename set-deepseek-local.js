// Template only: save a PRIVATE LOCAL COPY inside the iPad Quantumult X Scripts folder.
// Never publish a version containing the real API key.
var key = "PASTE_YOUR_KEY_HERE".trim();
if (!/^sk-/.test(key)) {
  console.log("[QXYTB] Invalid DeepSeek API key; nothing saved.");
} else {
  $prefs.setValueForKey(key, "QXYTB_DEEPSEEK_KEY");
  console.log("[QXYTB] DeepSeek API key stored in Quantumult X local prefs.");
}
$done({});
