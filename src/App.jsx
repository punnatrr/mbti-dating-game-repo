import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Icon({ name, className = "h-4 w-4" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    heart: (
      <svg {...common}>
        <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z" />
      </svg>
    ),
    sparkles: (
      <svg {...common}>
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
        <path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
      </svg>
    ),
    reset: (
      <svg {...common}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v6h6" />
      </svg>
    ),
    trophy: (
      <svg {...common}>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M17 6h3a3 3 0 0 1-3 3" />
        <path d="M7 6H4a3 3 0 0 0 3 3" />
      </svg>
    ),
    chatHeart: (
      <svg {...common}>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.3 8.8 8.8 0 0 1-3.8-.9L3 20l1.2-4.4A8.3 8.3 0 1 1 21 11.5Z" />
        <path d="M12 15s-3-1.8-3-4a1.8 1.8 0 0 1 3-1.3A1.8 1.8 0 0 1 15 11c0 2.2-3 4-3 4Z" />
      </svg>
    ),
    userCheck: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </svg>
    ),
  };

  return icons[name] ?? icons.heart;
}

const CHARACTERS = [
  {
    id: "infj",
    mbti: "INFJ",
    name: "ไอริน",
    archetype: "ผู้เข้าใจลึกซึ้ง",
    color: "from-violet-200 via-fuchsia-100 to-indigo-100",
    textAccent: "text-violet-700",
    avatar: "🌙",
    profile:
      "อ่อนโยน ชอบบทสนทนาที่มีความหมาย รักความจริงใจ และไม่ชอบการคุยเล่นที่ดูไม่ใส่ใจ",
    questions: [
      {
        scene: "ไอรินถามว่า ‘เธอคิดว่าความสัมพันธ์ที่ดีต้องมีอะไร?’",
        options: [
          { text: "ความเข้าใจและพื้นที่ปลอดภัยให้กัน", score: 14, reply: "ไอรินยิ้มเบา ๆ เหมือนคำตอบนี้แตะใจเธอ" },
          { text: "ต้องตอบแชทเร็วตลอด", score: 5, reply: "เธอหัวเราะนิด ๆ แต่ดูยังไม่ค่อยมั่นใจ" },
          { text: "ไม่รู้สิ ขอแค่ไม่น่าเบื่อก็พอ", score: 2, reply: "ไอรินเงียบไปครู่หนึ่ง เหมือนกำลังทบทวน" },
        ],
      },
      {
        scene: "เธอบอกว่าเมื่อคืนคิดมากจนนอนไม่หลับ",
        options: [
          { text: "อยากเล่าไหม เราฟังได้โดยไม่ตัดสินนะ", score: 14, reply: "เธอมองคุณด้วยความไว้ใจมากขึ้น" },
          { text: "อย่าคิดมากเลย เดี๋ยวก็หาย", score: 4, reply: "เธอพยักหน้า แต่สีหน้ายังไม่คลาย" },
          { text: "งั้นดูซีรีส์แก้เครียดไหม", score: 7, reply: "ไอรินยิ้มบาง ๆ อย่างขอบคุณ" },
        ],
      },
      {
        scene: "ไอรินชวนคุยเรื่องความฝันในอนาคต",
        options: [
          { text: "เราอยากทำบางอย่างที่มีความหมายกับผู้คน", score: 13, reply: "เธอตาเป็นประกายทันที" },
          { text: "อยากรวยเร็ว ๆ แล้วสบาย", score: 5, reply: "เธอฟังต่อ แต่ยังไม่รู้สึกเชื่อมโยงมากนัก" },
          { text: "ยังไม่ได้คิดเลย เอาไว้ก่อน", score: 3, reply: "ไอรินยิ้มรับ แต่บทสนทนาดรอปลง" },
        ],
      },
      {
        scene: "เธอถามว่าคุณรับมือความขัดแย้งยังไง",
        options: [
          { text: "คุยกันตรง ๆ แต่ต้องรักษาความรู้สึกกัน", score: 14, reply: "เธอดูสบายใจขึ้นมาก" },
          { text: "เงียบไว้ก่อน เดี๋ยวมันก็ผ่าน", score: 5, reply: "เธอดูไม่ค่อยแน่ใจ" },
          { text: "ถ้าไม่ถูกก็เถียงให้ชนะ", score: 1, reply: "ไอรินหลบตาเล็กน้อย" },
        ],
      },
      {
        scene: "ไอรินกำลังช่วยงานเพื่อนจนเหนื่อยมาก",
        options: [
          { text: "เธอดูแลคนอื่นเยอะแล้ว วันนี้ให้เราดูแลเธอบ้างนะ", score: 15, reply: "เธอหน้าแดงนิด ๆ" },
          { text: "ก็อย่ารับปากเยอะสิ", score: 3, reply: "เธอนิ่งไป เพราะคำพูดดูแข็งไปนิด" },
          { text: "สู้ ๆ นะ", score: 6, reply: "เธอยิ้มขอบคุณ แต่ยังเหนื่อยอยู่" },
        ],
      },
      {
        scene: "เธอถามว่าคุณสังเกตอะไรในตัวเธอบ้าง",
        options: [
          { text: "เธอเข้มแข็งกว่าที่ตัวเองคิด แต่ก็สมควรได้รับการพักนะ", score: 14, reply: "ไอรินประทับใจที่คุณมองลึกกว่าภายนอก" },
          { text: "เธอแต่งตัวน่ารักดี", score: 7, reply: "เธอยิ้ม แต่ยังอยากได้คำตอบที่ลึกกว่านั้น" },
          { text: "ก็ปกตินะ", score: 1, reply: "บรรยากาศเงียบลงทันที" },
        ],
      },
      {
        scene: "เธออยากไปเดตที่เงียบ ๆ",
        options: [
          { text: "ร้านหนังสือกับคาเฟ่เล็ก ๆ ที่คุยกันได้ยาว ๆ", score: 13, reply: "เธอรีบตอบตกลงแทบจะทันที" },
          { text: "ผับดัง ๆ คนเยอะ ๆ สนุกดี", score: 2, reply: "เธอดูลังเลอย่างเห็นได้ชัด" },
          { text: "ห้างก็ได้ ง่ายดี", score: 6, reply: "เธอพยักหน้าแบบกลาง ๆ" },
        ],
      },
      {
        scene: "ไอรินแชร์ความลับเล็ก ๆ ให้คุณฟัง",
        options: [
          { text: "ขอบคุณที่ไว้ใจเรา เราจะเก็บมันไว้อย่างดี", score: 15, reply: "ความไว้ใจของเธอเพิ่มขึ้นมาก" },
          { text: "โอ้ เรื่องนี้น่าสนใจมาก", score: 5, reply: "เธอเหมือนยังรอดูว่าคุณจริงจังแค่ไหน" },
          { text: "เดี๋ยวเล่าให้เพื่อนฟังได้ไหม", score: 0, reply: "ไอรินถอยห่างทันที" },
        ],
      },
      {
        scene: "เธอถามว่าคุณเชื่อในพรหมลิขิตไหม",
        options: [
          { text: "อาจมีจังหวะบางอย่าง แต่เราต้องเลือกดูแลมันเอง", score: 13, reply: "เธอยิ้มอย่างลึกซึ้ง" },
          { text: "ไม่เชื่อเลย ทุกอย่างคือเหตุผลล้วน ๆ", score: 5, reply: "เธอฟังได้ แต่ความโรแมนติกลดลง" },
          { text: "เชื่อ ถ้าคนตรงหน้าคือเธอ", score: 10, reply: "เธอเขิน แต่รู้ว่าคุณหยอดเก่ง" },
        ],
      },
      {
        scene: "ก่อนจบเดต ไอรินถามว่า ‘วันนี้รู้สึกยังไง?’",
        options: [
          { text: "เหมือนได้รู้จักโลกข้างในของเธอมากขึ้น และเราอยากรู้ต่อ", score: 15, reply: "ไอรินยิ้มเต็มตา นี่คือคำตอบที่เธอหวังไว้" },
          { text: "สนุกดี ไว้มาอีกนะ", score: 7, reply: "เธอยิ้ม แต่ยังไม่สุดใจ" },
          { text: "ก็โอเคนะ", score: 2, reply: "เธอพยักหน้าแบบสุภาพ" },
        ],
      },
    ],
  },
  {
    id: "entp",
    mbti: "ENTP",
    name: "เรน",
    archetype: "นักโต้ไอเดียเจ้าเสน่ห์",
    color: "from-orange-200 via-amber-100 to-yellow-100",
    textAccent: "text-orange-700",
    avatar: "⚡",
    profile: "ฉลาดไว ชอบความท้าทาย ชอบคนทันมุก กล้าคิดต่าง และไม่ซีเรียสจนเกินไป",
    questions: [
      {
        scene: "เรนเปิดด้วยคำถามว่า ‘ถ้าโลกนี้ห้ามโกหกหนึ่งวัน จะเกิดอะไรขึ้น?’",
        options: [
          { text: "ตลาดหุ้นอาจพัง แต่ความสัมพันธ์บางคู่จะรอดเพราะได้คุยจริง ๆ", score: 14, reply: "เรนหัวเราะถูกใจและอยากต่อประเด็นทันที" },
          { text: "ทุกคนก็คงพูดความจริง", score: 4, reply: "เขายิ้ม แต่ยังไม่รู้สึกว้าว" },
          { text: "คำถามแปลกอะ", score: 1, reply: "เรนทำหน้าซน ๆ แต่ความสนใจลดลง" },
        ],
      },
      {
        scene: "เขาท้าคุณดีเบตเรื่อง ‘รักแรกพบมีจริงไหม’",
        options: [
          { text: "มีในฐานะแรงดึงดูด แต่รักจริงต้องผ่านข้อมูลเพิ่ม", score: 14, reply: "เรนปรบมือเบา ๆ ถูกใจตรรกะของคุณ" },
          { text: "มีสิ เพราะในหนังมีเยอะ", score: 5, reply: "เขาหัวเราะ แต่ยังอยากได้เหตุผลกว่านี้" },
          { text: "ไม่ดีเบตได้ไหม เหนื่อย", score: 2, reply: "เรนยิ้มแห้ง ๆ" },
        ],
      },
      {
        scene: "เรนเล่นมุกกวน ๆ ใส่คุณ",
        options: [
          { text: "มุกนี้ให้ 7/10 อีก 3 คะแนนต้องเลี้ยงกาแฟเรา", score: 13, reply: "เขาหัวเราะดังมาก" },
          { text: "ฮ่า ๆ ตลกดี", score: 7, reply: "เขายิ้มรับแบบสบาย ๆ" },
          { text: "ไม่เห็นตลกเลย", score: 1, reply: "เขาเปลี่ยนเรื่องอย่างรวดเร็ว" },
        ],
      },
      {
        scene: "เขาถามว่าคุณชอบคนแบบไหน",
        options: [
          { text: "คนที่คุยแล้วสมองตื่น แต่หัวใจก็รู้สึกปลอดภัย", score: 15, reply: "เรนเงียบไปหนึ่งวิ ก่อนยิ้มกว้าง" },
          { text: "คนหล่อ/สวยและรวย", score: 5, reply: "เขาขำ แต่ไม่แน่ใจว่าคุณจริงจังไหม" },
          { text: "ใครก็ได้", score: 1, reply: "เรนทำหน้าเหมือนเกมง่ายไปจนไม่สนุก" },
        ],
      },
      {
        scene: "เรนเสนอไอเดียเดตสุดเพี้ยน: สุ่มขึ้นรถไฟฟ้าไปสถานีที่ไม่เคยลง",
        options: [
          { text: "ไปสิ แต่ต้องตั้งภารกิจลับให้แต่ละสถานีด้วย", score: 14, reply: "เขาดีใจเหมือนเจอคู่หูผจญภัย" },
          { text: "ไปก็ได้ถ้ามีร้านอาหาร", score: 7, reply: "เขาโอเค แต่ยังอยากได้ความบ้าบิ่นกว่านี้" },
          { text: "ไม่เอา เสียเวลา", score: 2, reply: "เรนทำหน้าหมดสนุก" },
        ],
      },
      {
        scene: "เขาถามว่า ‘ข้อเสียของเราคืออะไร ลองเดา’",
        options: [
          { text: "คิดไวไปจนบางทีใจคนอื่นตามไม่ทัน แต่จริง ๆ เธอไม่ได้ไม่แคร์", score: 14, reply: "เรนดูอึ้งที่คุณอ่านเขาออก" },
          { text: "พูดมาก", score: 4, reply: "เขาหัวเราะ แต่เหมือนโดนตัดจบ" },
          { text: "ไม่มีหรอก เธอเพอร์เฟกต์", score: 5, reply: "เขาหรี่ตาอย่างไม่เชื่อ" },
        ],
      },
      {
        scene: "เรนถามว่าจะเอาชนะใจคุณได้ยังไง",
        options: [
          { text: "ชนะไม่ยาก แค่ทำให้เราอยากแพ้ด้วยความสมัครใจ", score: 15, reply: "เรนยิ้มเจ้าเล่ห์แต่เขินจริง" },
          { text: "ซื้อของให้สิ", score: 4, reply: "เขาขำ แต่ไม่ค่อยอิน" },
          { text: "ไม่รู้เหมือนกัน", score: 2, reply: "บทสนทนาแผ่วลง" },
        ],
      },
      {
        scene: "เขาอยากรู้ว่าคุณรับมือกับความไม่แน่นอนยังไง",
        options: [
          { text: "มองเป็นเกมทดลอง วางแผนคร่าว ๆ แล้วปรับไปตามข้อมูล", score: 14, reply: "เรนชอบ mindset นี้มาก" },
          { text: "เครียดมาก ต้องให้ทุกอย่างชัดก่อน", score: 4, reply: "เขาเข้าใจ แต่ความเข้ากันยังไม่สูง" },
          { text: "ปล่อย ๆ ไป", score: 6, reply: "เขารู้สึกว่าคุณชิลดี แต่ยังไม่เฉียบ" },
        ],
      },
      {
        scene: "เรนถามว่า ‘ระหว่างความถูกต้องกับความสนุก เลือกอะไร?’",
        options: [
          { text: "เลือกคำถามใหม่ เพราะบางเรื่องทำให้ถูกและสนุกพร้อมกันได้", score: 15, reply: "เขาชี้นิ้วเหมือนคุณชนะรอบนี้" },
          { text: "ความถูกต้อง", score: 7, reply: "เขาพยักหน้า แต่ยังอยากแย้งต่อ" },
          { text: "ความสนุกสิ", score: 7, reply: "เขาขำ แต่ยังไม่ลึกพอ" },
        ],
      },
      {
        scene: "ก่อนแยกกัน เรนถามว่าเดตนี้ควรได้ชื่อว่าอะไร",
        options: [
          { text: "ปฏิบัติการทดลองหัวใจเวอร์ชันเบต้า", score: 15, reply: "เรนหัวเราะจนต้องขอนัดรอบสอง" },
          { text: "เดตกับเรน", score: 5, reply: "เขายิ้ม แต่บอกว่าชื่อธรรมดาไป" },
          { text: "ไม่ต้องตั้งชื่อหรอก", score: 1, reply: "เขาทำหน้าเสียดาย" },
        ],
      },
    ],
  },
  {
    id: "istj",
    mbti: "ISTJ",
    name: "กันต์",
    archetype: "คนจริงจังที่ไว้ใจได้",
    color: "from-slate-200 via-blue-100 to-cyan-100",
    textAccent: "text-slate-700",
    avatar: "🕰️",
    profile: "สุขุม รับผิดชอบ ชอบความชัดเจน เคารพเวลา และประทับใจคนที่จริงใจผ่านการกระทำ",
    questions: [
      {
        scene: "กันต์ถามว่าคุณมองการตรงต่อเวลายังไง",
        options: [
          { text: "เป็นการให้เกียรติเวลาของกันและกัน", score: 15, reply: "กันต์พยักหน้าอย่างพอใจมาก" },
          { text: "สายบ้างก็ไม่เป็นไรหรอก", score: 3, reply: "เขาเงียบไปเล็กน้อย" },
          { text: "แล้วแต่อารมณ์วันนั้น", score: 1, reply: "ความไว้ใจลดลงทันที" },
        ],
      },
      {
        scene: "เขาเห็นคุณกำลังเลือกเมนูอยู่นาน",
        options: [
          { text: "เราขอดูอีกนิด แล้วจะตัดสินใจในหนึ่งนาที", score: 13, reply: "เขาชอบที่คุณสื่อสารชัดเจน" },
          { text: "เลือกให้หน่อยสิ", score: 6, reply: "เขาช่วยเลือก แต่ยังไม่รู้จักความชอบคุณ" },
          { text: "ไม่รู้ เลือกไม่ได้อะ", score: 2, reply: "เขาดูอึดอัดกับความไม่ชัดเจน" },
        ],
      },
      {
        scene: "กันต์ถามว่าคุณรักษาสัญญาแค่ไหน",
        options: [
          { text: "ถ้ารับปากแล้วจะทำ ถ้าทำไม่ได้จะบอกล่วงหน้า", score: 15, reply: "เขาดูไว้ใจคุณขึ้นมาก" },
          { text: "ก็พยายามนะ แต่ลืมบ้าง", score: 4, reply: "เขาพยักหน้าแบบระวังตัว" },
          { text: "สัญญาไม่ต้องจริงจังก็ได้", score: 0, reply: "กันต์ดูผิดหวังชัดเจน" },
        ],
      },
      {
        scene: "เขาพูดน้อยจนคุณไม่แน่ใจว่าเขาสนุกไหม",
        options: [
          { text: "เราอาจถามตรง ๆ ได้ไหม วันนี้คุณโอเคกับเดตนี้ไหม", score: 14, reply: "เขาชื่นชมความตรงไปตรงมาของคุณ" },
          { text: "ทำไมเงียบจัง เบื่อเหรอ", score: 4, reply: "เขาดูเกร็งขึ้น" },
          { text: "ช่างเถอะ ไม่ถามดีกว่า", score: 3, reply: "โอกาสใกล้ชิดลดลง" },
        ],
      },
      {
        scene: "กันต์เล่าว่าเขาชอบวางแผนล่วงหน้า",
        options: [
          { text: "ดีเลย เราชอบคนที่ทำให้รู้สึกมั่นคง", score: 14, reply: "เขาดูดีใจแต่เก็บอาการ" },
          { text: "ชีวิตต้อง spontaneous สิ", score: 5, reply: "เขาฟังได้ แต่ยังไม่มั่นใจว่าเข้ากัน" },
          { text: "วางแผนเยอะน่าเบื่อ", score: 1, reply: "เขาดูเสียความรู้สึก" },
        ],
      },
      {
        scene: "เขาช่วยถือของให้คุณโดยไม่พูดอะไร",
        options: [
          { text: "ขอบคุณนะ คุณใส่ใจผ่านการกระทำมากเลย", score: 15, reply: "กันต์หันไปทางอื่นเหมือนเขิน" },
          { text: "ดีมาก ถือให้อีกนะ", score: 3, reply: "เขารู้สึกเหมือนถูกสั่งมากกว่าถูกเห็นค่า" },
          { text: "อืม", score: 1, reply: "เขาไม่แสดงออก แต่ความรู้สึกดีลดลง" },
        ],
      },
      {
        scene: "กันต์ถามว่าเดตครั้งหน้าอยากไปไหน",
        options: [
          { text: "วันเสาร์บ่าย พิพิธภัณฑ์ แล้วต่อร้านข้าวใกล้ ๆ ดีไหม", score: 14, reply: "เขาชอบความชัดเจนของแผนมาก" },
          { text: "ไว้ค่อยคิด", score: 4, reply: "เขาดูไม่ค่อยมั่นใจกับความต่อเนื่อง" },
          { text: "ที่ไหนก็ได้", score: 5, reply: "เขาพยายามช่วยคิดต่อ" },
        ],
      },
      {
        scene: "เขาบอกว่าความรักควรพิสูจน์ด้วยเวลา",
        options: [
          { text: "เห็นด้วย ความสม่ำเสมอทำให้ความรู้สึกน่าเชื่อถือ", score: 15, reply: "เขาสบตาคุณนานขึ้น" },
          { text: "รักก็คือรัก ไม่ต้องพิสูจน์", score: 5, reply: "เขาฟัง แต่ยังรู้สึกว่าเร็วไป" },
          { text: "นานไปก็เบื่อ", score: 1, reply: "เขาดูปิดใจลง" },
        ],
      },
      {
        scene: "กันต์ทำผิดพลาดเล็กน้อยแล้วขอโทษคุณ",
        options: [
          { text: "ขอบคุณที่พูดตรง ๆ เราโอเค และเห็นว่าคุณรับผิดชอบ", score: 14, reply: "เขาผ่อนคลายลงอย่างเห็นได้ชัด" },
          { text: "ไม่เป็นไร", score: 7, reply: "เขาโล่งใจระดับหนึ่ง" },
          { text: "ทีหลังอย่าทำอีก", score: 3, reply: "เขารับฟัง แต่บรรยากาศแข็งขึ้น" },
        ],
      },
      {
        scene: "ก่อนกลับ กันต์ถามว่าคุณอยากสานต่อไหม",
        options: [
          { text: "อยาก เรารู้สึกว่าคุณเป็นคนที่พึ่งพาได้ และเราอยากค่อย ๆ รู้จักคุณ", score: 15, reply: "กันต์ยิ้มบาง ๆ แต่จริงใจมาก" },
          { text: "ก็ได้นะ", score: 5, reply: "เขายังไม่แน่ใจว่าคุณจริงจังไหม" },
          { text: "เดี๋ยวดูก่อน", score: 2, reply: "เขาพยักหน้า แต่ระยะห่างยังอยู่" },
        ],
      },
    ],
  },
  {
    id: "enfp",
    mbti: "ENFP",
    name: "มิว",
    archetype: "พลังสดใสสายฝัน",
    color: "from-pink-200 via-rose-100 to-yellow-100",
    textAccent: "text-pink-700",
    avatar: "🌈",
    profile: "สดใส ชอบความจริงใจ ความสนุก และคนที่เห็นคุณค่าในความเป็นตัวเองของเธอ",
    questions: [
      {
        scene: "มิวถามว่า ‘ถ้าวันนี้เราหนีไปเที่ยวได้หนึ่งที่ จะไปไหน?’",
        options: [
          { text: "ทะเลตอนเย็น แล้วตั้งชื่อก้อนเมฆด้วยกัน", score: 14, reply: "มิวหัวเราะสดใสมาก" },
          { text: "ที่ไหนก็ได้", score: 4, reply: "เธอเอียงคอเหมือนอยากได้จินตนาการมากกว่านี้" },
          { text: "ไม่ไปอะ เหนื่อย", score: 1, reply: "พลังของเธอแผ่วลงทันที" },
        ],
      },
      {
        scene: "เธอเล่าไอเดียงานศิลปะที่คนอื่นบอกว่าเพ้อฝัน",
        options: [
          { text: "มันอาจเพ้อ แต่เพ้อแบบมีประกาย เล่าให้เราฟังต่อสิ", score: 15, reply: "มิวดีใจมากที่คุณไม่ดับฝันเธอ" },
          { text: "ก็ต้องดูว่าทำได้จริงไหม", score: 6, reply: "เธอฟัง แต่รู้สึกถูกดึงกลับพื้นเร็วไป" },
          { text: "คนอื่นอาจพูดถูกนะ", score: 1, reply: "มิวเงียบไปอย่างผิดหวัง" },
        ],
      },
      {
        scene: "มิวถามว่าคุณชอบความรักแบบไหน",
        options: [
          { text: "แบบที่เป็นทั้งเพื่อนร่วมผจญภัยและบ้านให้กัน", score: 15, reply: "เธอจับแก้มตัวเองเหมือนเขิน" },
          { text: "แบบสบาย ๆ ไม่ผูกมัด", score: 4, reply: "เธอดูไม่มั่นใจในความตั้งใจของคุณ" },
          { text: "แบบที่ไม่วุ่นวาย", score: 3, reply: "เธอหัวเราะแห้ง ๆ" },
        ],
      },
      {
        scene: "เธอเปลี่ยนเรื่องคุยเร็วมาก",
        options: [
          { text: "เดี๋ยวนะ สมองเธอวิ่งเร็วมาก เราชอบนะ ตามต่อ ๆ", score: 14, reply: "มิวดูดีใจที่คุณตามทัน" },
          { text: "คุยทีละเรื่องได้ไหม", score: 6, reply: "เธอพยายามช้าลง แต่พลังลดลง" },
          { text: "งงอะ", score: 2, reply: "เธอเริ่มเกร็ง" },
        ],
      },
      {
        scene: "มิวเห็นร้านถ่ายรูปสติ๊กเกอร์แล้วอยากเข้า",
        options: [
          { text: "ไปสิ แต่เราต้องโพสท่าประหลาดที่สุดในร้าน", score: 14, reply: "เธอลากคุณเข้าไปทันที" },
          { text: "ถ่ายธรรมดาก็พอ", score: 6, reply: "เธอโอเค แต่ยังอยากเล่นมากกว่านี้" },
          { text: "ไม่เอา เด็กไป", score: 1, reply: "เธอทำหน้าจ๋อย" },
        ],
      },
      {
        scene: "เธอถามว่าคุณเห็นอะไรในตัวเธอ",
        options: [
          { text: "เธอทำให้โลกธรรมดาดูมีสีขึ้น แต่ข้างในก็มีความจริงจังที่น่ารัก", score: 15, reply: "มิวเงียบไปเพราะซึ้งจริง" },
          { text: "เธอตลกดี", score: 6, reply: "เธอยิ้ม แต่ยังอยากถูกเห็นมากกว่านั้น" },
          { text: "เธอเสียงดัง", score: 2, reply: "เธอหัวเราะกลบเกลื่อน" },
        ],
      },
      {
        scene: "มิวกลัวว่าตัวเองจะเยอะเกินไปสำหรับใครบางคน",
        options: [
          { text: "สำหรับเรามันไม่เยอะ มันคือชีวิตชีวาของเธอ", score: 15, reply: "มิวตาเป็นประกายและยิ้มกว้าง" },
          { text: "ก็ลดลงบ้างก็ดี", score: 2, reply: "เธอดูเจ็บนิด ๆ" },
          { text: "ไม่รู้สิ แล้วแต่คน", score: 4, reply: "เธอยังไม่รู้สึกปลอดภัย" },
        ],
      },
      {
        scene: "เธอชวนคุณเขียน bucket list แปลก ๆ ด้วยกัน",
        options: [
          { text: "ข้อแรก: ไปดูดาวแล้วตั้งชื่อดาวปลอมของเราเอง", score: 14, reply: "มิวรีบจดอย่างตื่นเต้น" },
          { text: "กินร้านดังให้ครบ", score: 7, reply: "เธอสนใจ แต่ยังไม่แปลกพอ" },
          { text: "ไม่ค่อยมีอะไรอยากทำ", score: 1, reply: "พลังบทสนทนาตกลง" },
        ],
      },
      {
        scene: "มิวถามว่าคุณจะทำยังไงถ้าเธอเศร้าแต่ยังยิ้มอยู่",
        options: [
          { text: "เราจะถามเบา ๆ ว่ารอยยิ้มนี้ต้องการคนอยู่ข้าง ๆ ไหม", score: 15, reply: "มิวซึ้งจนพูดไม่ออกชั่วครู่" },
          { text: "ชวนไปกินของอร่อย", score: 8, reply: "เธอยิ้ม ขอบคุณที่พยายามทำให้ดีขึ้น" },
          { text: "ถ้ายิ้มอยู่ก็แปลว่าโอเค", score: 1, reply: "เธอดูผิดหวังที่คุณมองไม่ลึก" },
        ],
      },
      {
        scene: "ท้ายเดต มิวถามว่า ‘เราแปลกไหม?’",
        options: [
          { text: "แปลกแบบที่ทำให้เราอยากรู้จักวันพรุ่งนี้ของเธอ", score: 15, reply: "มิวหัวเราะเขิน ๆ และขอนัดต่อ" },
          { text: "แปลกดี", score: 6, reply: "เธอยิ้ม แต่ยังอยากได้คำที่อบอุ่นกว่านี้" },
          { text: "ก็นิดนึง", score: 2, reply: "เธอทำหน้ามุ่ย" },
        ],
      },
    ],
  },
];

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function getMaxScore(character) {
  return character.questions.reduce(
    (sum, question) => sum + Math.max(...question.options.map((option) => option.score)),
    0
  );
}

function getEnding(percent) {
  if (percent >= 75) return "จีบติด!";
  if (percent >= 50) return "มีลุ้นต่อ";
  return "ยังจีบไม่ติด";
}

function runSanityTests() {
  console.assert(CHARACTERS.length >= 4, "ควรมีตัวละครอย่างน้อย 4 ตัว");
  CHARACTERS.forEach((character) => {
    console.assert(character.questions.length === 10, `${character.mbti} ต้องมี 10 คำถาม`);
    character.questions.forEach((question, index) => {
      console.assert(question.options.length === 3, `${character.mbti} ข้อ ${index + 1} ต้องมี 3 ตัวเลือก`);
      question.options.forEach((option) => {
        console.assert(Number.isFinite(option.score), "ทุกตัวเลือกต้องมี score เป็นตัวเลข");
        console.assert(option.score >= 0, "score ต้องไม่ติดลบ");
      });
    });
    console.assert(getMaxScore(character) > 0, `${character.mbti} ต้องมีคะแนนเต็มมากกว่า 0`);
  });
  console.assert(clamp(-10) === 0, "clamp ค่าต่ำกว่า 0 ต้องได้ 0");
  console.assert(clamp(120) === 100, "clamp ค่าสูงกว่า 100 ต้องได้ 100");
  console.assert(getEnding(80) === "จีบติด!", "คะแนน 80 ควรจีบติด");
  console.assert(getEnding(60) === "มีลุ้นต่อ", "คะแนน 60 ควรมีลุ้นต่อ");
  console.assert(getEnding(20) === "ยังจีบไม่ติด", "คะแนน 20 ควรยังจีบไม่ติด");
}

if (typeof window !== "undefined") {
  runSanityTests();
}

function Avatar({ character, large = false }) {
  return (
    <div
      className={`relative grid place-items-center rounded-full bg-gradient-to-br ${character.color} shadow-inner ${
        large ? "h-44 w-44 text-7xl" : "h-16 w-16 text-3xl"
      }`}
    >
      <div className="absolute inset-2 rounded-full border border-white/60" />
      <div className="absolute bottom-5 h-10 w-20 rounded-full bg-white/50 blur-xl" />
      <span className="relative drop-shadow-sm">{character.avatar}</span>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
        <span>เปอร์เซ็นต์จีบติด</span>
        <span>{value}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/70 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [log, setLog] = useState([]);

  const character = useMemo(
    () => CHARACTERS.find((item) => item.id === selectedId),
    [selectedId]
  );

  const maxScore = character ? getMaxScore(character) : 1;
  const percent = character ? clamp(Math.round((score / maxScore) * 100)) : 0;
  const currentQuestion = character?.questions[questionIndex];
  const isFinished = Boolean(character && questionIndex >= character.questions.length);
  const ending = getEnding(percent);

  function startGame(id) {
    setSelectedId(id);
    setQuestionIndex(0);
    setScore(0);
    setAnswered(null);
    setLog([]);
  }

  function resetGame() {
    setSelectedId(null);
    setQuestionIndex(0);
    setScore(0);
    setAnswered(null);
    setLog([]);
  }

  function chooseOption(option) {
    if (answered || !currentQuestion) return;
    setAnswered(option);
    setScore((prev) => prev + option.score);
    setLog((prev) => [
      ...prev,
      {
        q: currentQuestion.scene,
        a: option.text,
        score: option.score,
      },
    ]);
  }

  function nextQuestion() {
    setAnswered(null);
    setQuestionIndex((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-xl shadow-rose-100/60 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
              <Icon name="chatHeart" /> MBTI Dating Simulator
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">เกมจีบคนตามบุคลิก MBTI</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              เลือกตัวละคร ตอบคำถาม 10 ข้อ ข้อละ 3 ตัวเลือก คำตอบที่เข้ากับบุคลิกจะเพิ่มเปอร์เซ็นต์จีบติดมากกว่า
            </p>
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <Icon name="reset" /> เริ่มใหม่
          </button>
        </header>

        {!character && (
          <section>
            <div className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-700">
              <Icon name="sparkles" className="h-5 w-5 text-rose-500" /> เลือกคนที่อยากจีบ
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {CHARACTERS.map((item) => (
                <motion.button
                  type="button"
                  key={item.id}
                  onClick={() => startGame(item.id)}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group overflow-hidden rounded-[2rem] border border-white bg-white/80 p-5 text-left shadow-xl shadow-slate-200/70 transition hover:shadow-2xl"
                >
                  <div className={`mb-5 rounded-[1.5rem] bg-gradient-to-br ${item.color} p-5`}>
                    <div className="flex items-center justify-between">
                      <Avatar character={item} />
                      <span className={`rounded-full bg-white/80 px-3 py-1 text-sm font-black ${item.textAccent}`}>
                        {item.mbti}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black">{item.name}</h2>
                  <p className={`mt-1 font-bold ${item.textAccent}`}>{item.archetype}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.profile}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition group-hover:bg-rose-600">
                    เริ่มจีบ <Icon name="heart" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {character && !isFinished && currentQuestion && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-[2rem] border border-white bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
              <div className="flex flex-col items-center text-center">
                <Avatar character={character} large />
                <div className="mt-5 rounded-full bg-slate-900 px-4 py-1 text-sm font-black text-white">{character.mbti}</div>
                <h2 className="mt-3 text-3xl font-black">{character.name}</h2>
                <p className={`font-bold ${character.textAccent}`}>{character.archetype}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{character.profile}</p>
              </div>
              <div className="mt-7">
                <ProgressBar value={percent} />
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                ข้อที่ <b>{questionIndex + 1}</b> / {character.questions.length}
              </div>
            </aside>

            <section className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
                    <Icon name="heart" /> สถานการณ์เดต
                  </div>
                  <h3 className="text-2xl font-black leading-snug md:text-4xl">{currentQuestion.scene}</h3>

                  <div className="mt-8 grid gap-4">
                    {currentQuestion.options.map((option, index) => {
                      const isChosen = answered?.text === option.text;
                      return (
                        <button
                          type="button"
                          key={option.text}
                          onClick={() => chooseOption(option)}
                          disabled={Boolean(answered)}
                          className={`rounded-3xl border p-5 text-left shadow-sm transition ${
                            isChosen
                              ? "border-rose-400 bg-rose-50 ring-4 ring-rose-100"
                              : "border-slate-100 bg-white hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md"
                          } ${answered && !isChosen ? "opacity-55" : ""}`}
                        >
                          <div className="flex gap-4">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-900 font-black text-white">
                              {index + 1}
                            </span>
                            <span className="text-lg font-bold leading-7">{option.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-7 rounded-3xl bg-gradient-to-br from-rose-50 to-indigo-50 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-xl shadow-sm">{character.avatar}</div>
                        <div>
                          <p className="font-bold text-slate-800">{answered.reply}</p>
                          <p className="mt-1 text-sm text-slate-500">คะแนนความประทับใจ +{answered.score}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextQuestion}
                        className="mt-5 rounded-2xl bg-rose-600 px-5 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-700"
                      >
                        {questionIndex === character.questions.length - 1 ? "ดูผลลัพธ์" : "ข้อต่อไป"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </section>
          </section>
        )}

        {character && isFinished && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-[2rem] border border-white bg-white/75 p-6 text-center shadow-xl shadow-slate-200/70 backdrop-blur">
              <div className="flex justify-center">
                <Avatar character={character} large />
              </div>
              <h2 className="mt-5 text-3xl font-black">{character.name}</h2>
              <p className={`font-bold ${character.textAccent}`}>{character.mbti} · {character.archetype}</p>
              <div className="mt-7">
                <ProgressBar value={percent} />
              </div>
            </aside>

            <section className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
                <Icon name="trophy" /> ผลลัพธ์
              </div>
              <h3 className="text-4xl font-black md:text-6xl">{ending}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                คุณทำคะแนนได้ {percent}% กับ {character.name} {percent >= 75
                  ? "คำตอบของคุณเข้ากับบุคลิกของตัวละครมาก ความสัมพันธ์ไปต่อได้สวย"
                  : percent >= 50
                  ? "ยังมีโอกาส แต่ต้องเข้าใจจังหวะและความต้องการของตัวละครมากขึ้น"
                  : "คำตอบหลายข้อยังไม่ตรงใจ ลองเล่นใหม่และเลือกคำพูดที่เข้ากับบุคลิกมากขึ้น"}
              </p>

              <div className="mt-8 grid gap-3">
                {log.map((item, index) => (
                  <details key={`${item.q}-${index}`} className="rounded-2xl bg-slate-50 p-4">
                    <summary className="cursor-pointer font-bold">ข้อ {index + 1}: +{item.score} คะแนน</summary>
                    <p className="mt-3 text-sm text-slate-600">สถานการณ์: {item.q}</p>
                    <p className="mt-1 text-sm text-slate-600">คุณตอบ: {item.a}</p>
                  </details>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => startGame(character.id)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-700"
                >
                  <Icon name="reset" /> จีบคนเดิมอีกครั้ง
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <Icon name="userCheck" /> เลือกตัวละครใหม่
                </button>
              </div>
            </section>
          </section>
        )}
      </div>
    </main>
  );
}
