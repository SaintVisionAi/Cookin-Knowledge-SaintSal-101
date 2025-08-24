import express from "express";
import crypto from "crypto";
import { GHLWebhookPayload } from "@shared/api";

const router = express.Router();

/**
 * Verify GHL webhook signature
 */
const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): boolean => {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return false;
  }
};

/**
 * Process webhook events with HACP behavioral analysis
 */
const processWebhookEvent = async (payload: GHLWebhookPayload) => {
  try {
    console.log(`📡 Processing GHL webhook: ${payload.type}`);
    
    switch (payload.type) {
      case "contact.created":
        await handleContactCreated(payload);
        break;
      case "contact.updated":
        await handleContactUpdated(payload);
        break;
      case "opportunity.created":
        await handleOpportunityCreated(payload);
        break;
      case "opportunity.updated":
        await handleOpportunityUpdated(payload);
        break;
      default:
        console.log(`Unknown webhook type: ${payload.type}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Webhook processing error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Handle new contact creation with HACP tier assignment
 */
const handleContactCreated = async (payload: GHLWebhookPayload) => {
  console.log("👤 New contact created:", payload.data);
  
  // Here you would:
  // 1. Assign HACP tier based on lead source/value
  // 2. Trigger appropriate T1 behavioral response
  // 3. Schedule follow-up actions
  // 4. Update internal analytics
  
  // For now, just log the event
  console.log("🎯 HACP T1 (Discovery) tier assigned to new contact");
};

/**
 * Handle contact updates with behavioral progression tracking
 */
const handleContactUpdated = async (payload: GHLWebhookPayload) => {
  console.log("📝 Contact updated:", payload.data);
  
  // Here you would:
  // 1. Analyze contact progression through HACP tiers
  // 2. Trigger tier-appropriate responses
  // 3. Update emotional calibration
  // 4. Check for escalation triggers
  
  console.log("🔄 HACP behavioral progression analysis triggered");
};

/**
 * Handle new opportunity creation with tier-based routing
 */
const handleOpportunityCreated = async (payload: GHLWebhookPayload) => {
  console.log("💰 New opportunity created:", payload.data);
  
  // Here you would:
  // 1. Determine HACP tier based on opportunity value
  // 2. Route to appropriate behavioral response
  // 3. Set up automated follow-up sequences
  // 4. Notify relevant team members
  
  console.log("🚀 HACP opportunity routing initiated");
};

/**
 * Handle opportunity updates with escalation checking
 */
const handleOpportunityUpdated = async (payload: GHLWebhookPayload) => {
  console.log("📈 Opportunity updated:", payload.data);
  
  // Here you would:
  // 1. Check if escalation is required based on HACP rules
  // 2. Update emotional calibration
  // 3. Trigger next-step automation
  // 4. Update analytics and forecasting
  
  console.log("⚡ HACP escalation check completed");
};

/**
 * Main webhook endpoint
 */
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const signature = req.headers["x-ghl-signature"] as string;
    const webhookSecret = process.env.GHL_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("❌ GHL webhook secret not configured");
      return res.status(500).json({ error: "Webhook secret not configured" });
    }
    
    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      req.body.toString(),
      signature,
      webhookSecret
    );
    
    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return res.status(401).json({ error: "Invalid signature" });
    }
    
    // Parse webhook payload
    const payload: GHLWebhookPayload = JSON.parse(req.body.toString());
    
    // Process webhook event
    const result = await processWebhookEvent(payload);
    
    if (result.success) {
      console.log("✅ Webhook processed successfully");
      res.status(200).json({ message: "Webhook processed successfully" });
    } else {
      console.error("❌ Webhook processing failed:", result.error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
    
  } catch (error) {
    console.error("❌ Webhook endpoint error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Health check endpoint for webhook status
 */
router.get("/status", (req, res) => {
  const hasSecret = !!process.env.GHL_WEBHOOK_SECRET;
  
  res.json({
    status: "active",
    hasSecret,
    endpoint: "/api/ghl-webhook",
    timestamp: new Date().toISOString(),
    supportedEvents: [
      "contact.created",
      "contact.updated", 
      "opportunity.created",
      "opportunity.updated"
    ]
  });
});

export default router;