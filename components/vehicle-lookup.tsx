"use client"

import { useState, useRef, useEffect } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface EngineSpec {
  label: string
  stockHp: number
  stockNm: number
  stage1Hp: number
  stage1Nm: number
}

interface CarModel {
  model: string
  engines: EngineSpec[]
}

interface CarMake {
  make: string
  models: CarModel[]
}

// ─── Database ─────────────────────────────────────────────────────────────────

const database: CarMake[] = [
  {
    make: "BMW",
    models: [
      {
        model: "Serija 1",
        engines: [
          { label: "116d (116 KS)", stockHp: 116, stockNm: 260, stage1Hp: 150, stage1Nm: 320 },
          { label: "118d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 390 },
          { label: "120d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "125d (218 KS)", stockHp: 218, stockNm: 450, stage1Hp: 265, stage1Nm: 540 },
          { label: "116i (136 KS)", stockHp: 136, stockNm: 220, stage1Hp: 165, stage1Nm: 265 },
          { label: "120i (184 KS)", stockHp: 184, stockNm: 270, stage1Hp: 218, stage1Nm: 320 },
          { label: "M135i (306 KS)", stockHp: 306, stockNm: 400, stage1Hp: 360, stage1Nm: 480 },
        ],
      },
      {
        model: "Serija 2",
        engines: [
          { label: "218d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 390 },
          { label: "220d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "225d (218 KS)", stockHp: 218, stockNm: 450, stage1Hp: 265, stage1Nm: 540 },
          { label: "220i (184 KS)", stockHp: 184, stockNm: 270, stage1Hp: 218, stage1Nm: 320 },
          { label: "M235i (326 KS)", stockHp: 326, stockNm: 450, stage1Hp: 380, stage1Nm: 530 },
        ],
      },
      {
        model: "Serija 3",
        engines: [
          { label: "316d (116 KS)", stockHp: 116, stockNm: 260, stage1Hp: 150, stage1Nm: 320 },
          { label: "318d (143 KS)", stockHp: 143, stockNm: 320, stage1Hp: 180, stage1Nm: 390 },
          { label: "320d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "325d (218 KS)", stockHp: 218, stockNm: 450, stage1Hp: 265, stage1Nm: 540 },
          { label: "330d (258 KS)", stockHp: 258, stockNm: 560, stage1Hp: 310, stage1Nm: 650 },
          { label: "318i (156 KS)", stockHp: 156, stockNm: 240, stage1Hp: 185, stage1Nm: 290 },
          { label: "320i (184 KS)", stockHp: 184, stockNm: 270, stage1Hp: 218, stage1Nm: 320 },
          { label: "330i (258 KS)", stockHp: 258, stockNm: 400, stage1Hp: 300, stage1Nm: 460 },
          { label: "335i (306 KS)", stockHp: 306, stockNm: 400, stage1Hp: 360, stage1Nm: 480 },
          { label: "340i (326 KS)", stockHp: 326, stockNm: 450, stage1Hp: 380, stage1Nm: 530 },
          { label: "M3 (431 KS)", stockHp: 431, stockNm: 550, stage1Hp: 500, stage1Nm: 640 },
        ],
      },
      {
        model: "Serija 4",
        engines: [
          { label: "418d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 390 },
          { label: "420d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "430d (258 KS)", stockHp: 258, stockNm: 560, stage1Hp: 310, stage1Nm: 650 },
          { label: "420i (184 KS)", stockHp: 184, stockNm: 270, stage1Hp: 218, stage1Nm: 320 },
          { label: "430i (252 KS)", stockHp: 252, stockNm: 350, stage1Hp: 300, stage1Nm: 420 },
          { label: "M4 (431 KS)", stockHp: 431, stockNm: 550, stage1Hp: 500, stage1Nm: 640 },
        ],
      },
      {
        model: "Serija 5",
        engines: [
          { label: "518d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 390 },
          { label: "520d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "525d (218 KS)", stockHp: 218, stockNm: 450, stage1Hp: 265, stage1Nm: 540 },
          { label: "530d (258 KS)", stockHp: 258, stockNm: 560, stage1Hp: 310, stage1Nm: 650 },
          { label: "520i (184 KS)", stockHp: 184, stockNm: 270, stage1Hp: 218, stage1Nm: 320 },
          { label: "530i (252 KS)", stockHp: 252, stockNm: 350, stage1Hp: 300, stage1Nm: 420 },
          { label: "M5 (600 KS)", stockHp: 600, stockNm: 750, stage1Hp: 680, stage1Nm: 850 },
        ],
      },
      {
        model: "X1",
        engines: [
          { label: "sDrive18d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 390 },
          { label: "xDrive20d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "xDrive25d (231 KS)", stockHp: 231, stockNm: 450, stage1Hp: 280, stage1Nm: 540 },
        ],
      },
      {
        model: "X3",
        engines: [
          { label: "xDrive20d (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "xDrive30d (258 KS)", stockHp: 258, stockNm: 560, stage1Hp: 310, stage1Nm: 650 },
          { label: "xDrive30i (252 KS)", stockHp: 252, stockNm: 350, stage1Hp: 295, stage1Nm: 420 },
          { label: "M40d (326 KS)", stockHp: 326, stockNm: 680, stage1Hp: 380, stage1Nm: 780 },
        ],
      },
      {
        model: "X5",
        engines: [
          { label: "xDrive30d (258 KS)", stockHp: 258, stockNm: 560, stage1Hp: 310, stage1Nm: 650 },
          { label: "xDrive40d (313 KS)", stockHp: 313, stockNm: 630, stage1Hp: 370, stage1Nm: 730 },
          { label: "xDrive30i (272 KS)", stockHp: 272, stockNm: 400, stage1Hp: 320, stage1Nm: 470 },
          { label: "M50d (400 KS)", stockHp: 400, stockNm: 760, stage1Hp: 460, stage1Nm: 850 },
        ],
      },
    ],
  },
  {
    make: "Audi",
    models: [
      {
        model: "A3",
        engines: [
          { label: "1.6 TDI (105 KS)", stockHp: 105, stockNm: 250, stage1Hp: 135, stage1Nm: 310 },
          { label: "1.6 TDI (110 KS)", stockHp: 110, stockNm: 250, stage1Hp: 145, stage1Nm: 315 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 190, stage1Nm: 400 },
          { label: "2.0 TDI (184 KS)", stockHp: 184, stockNm: 380, stage1Hp: 225, stage1Nm: 460 },
          { label: "1.4 TFSI (125 KS)", stockHp: 125, stockNm: 200, stage1Hp: 155, stage1Nm: 245 },
          { label: "1.8 TFSI (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 215, stage1Nm: 310 },
          { label: "2.0 TFSI (190 KS)", stockHp: 190, stockNm: 320, stage1Hp: 240, stage1Nm: 400 },
          { label: "RS3 (400 KS)", stockHp: 400, stockNm: 500, stage1Hp: 460, stage1Nm: 580 },
        ],
      },
      {
        model: "A4",
        engines: [
          { label: "2.0 TDI (136 KS)", stockHp: 136, stockNm: 320, stage1Hp: 175, stage1Nm: 395 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 420 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "3.0 TDI (218 KS)", stockHp: 218, stockNm: 500, stage1Hp: 265, stage1Nm: 590 },
          { label: "3.0 TDI (272 KS)", stockHp: 272, stockNm: 600, stage1Hp: 325, stage1Nm: 700 },
          { label: "2.0 TFSI (170 KS)", stockHp: 170, stockNm: 280, stage1Hp: 240, stage1Nm: 360 },
          { label: "2.0 TFSI (190 KS)", stockHp: 190, stockNm: 320, stage1Hp: 240, stage1Nm: 400 },
          { label: "2.0 TFSI (245 KS)", stockHp: 245, stockNm: 370, stage1Hp: 300, stage1Nm: 440 },
          { label: "RS4 (450 KS)", stockHp: 450, stockNm: 600, stage1Hp: 510, stage1Nm: 680 },
        ],
      },
      {
        model: "A6",
        engines: [
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "3.0 TDI (218 KS)", stockHp: 218, stockNm: 500, stage1Hp: 265, stage1Nm: 590 },
          { label: "3.0 TDI (272 KS)", stockHp: 272, stockNm: 620, stage1Hp: 325, stage1Nm: 720 },
          { label: "3.0 TDI (326 KS)", stockHp: 326, stockNm: 700, stage1Hp: 380, stage1Nm: 800 },
          { label: "2.0 TFSI (190 KS)", stockHp: 190, stockNm: 320, stage1Hp: 240, stage1Nm: 400 },
          { label: "3.0 TFSI (333 KS)", stockHp: 333, stockNm: 440, stage1Hp: 390, stage1Nm: 520 },
          { label: "RS6 (600 KS)", stockHp: 600, stockNm: 800, stage1Hp: 680, stage1Nm: 900 },
        ],
      },
      {
        model: "Q3",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TFSI (211 KS)", stockHp: 211, stockNm: 350, stage1Hp: 250, stage1Nm: 420 },
          { label: "RSQ3 (400 KS)", stockHp: 400, stockNm: 480, stage1Hp: 460, stage1Nm: 560 },
        ],
      },
      {
        model: "Q5",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "3.0 TDI (245 KS)", stockHp: 245, stockNm: 500, stage1Hp: 295, stage1Nm: 590 },
          { label: "2.0 TFSI (225 KS)", stockHp: 225, stockNm: 350, stage1Hp: 270, stage1Nm: 420 },
          { label: "SQ5 3.0 TFSI (354 KS)", stockHp: 354, stockNm: 500, stage1Hp: 410, stage1Nm: 580 },
        ],
      },
      {
        model: "Q7",
        engines: [
          { label: "3.0 TDI (218 KS)", stockHp: 218, stockNm: 500, stage1Hp: 265, stage1Nm: 590 },
          { label: "3.0 TDI (272 KS)", stockHp: 272, stockNm: 600, stage1Hp: 325, stage1Nm: 700 },
          { label: "3.0 TFSI (333 KS)", stockHp: 333, stockNm: 440, stage1Hp: 390, stage1Nm: 520 },
          { label: "SQ7 4.0 TDI (435 KS)", stockHp: 435, stockNm: 900, stage1Hp: 500, stage1Nm: 1000 },
        ],
      },
    ],
  },
  {
    make: "Volkswagen",
    models: [
      {
        model: "Golf 6",
        engines: [
          { label: "1.6 TDI (105 KS)", stockHp: 105, stockNm: 250, stage1Hp: 135, stage1Nm: 305 },
          { label: "2.0 TDI (110 KS)", stockHp: 110, stockNm: 270, stage1Hp: 145, stage1Nm: 340 },
          { label: "2.0 TDI (140 KS)", stockHp: 140, stockNm: 320, stage1Hp: 175, stage1Nm: 390 },
          { label: "1.4 TSI (122 KS)", stockHp: 122, stockNm: 200, stage1Hp: 155, stage1Nm: 250 },
          { label: "1.4 TSI (160 KS)", stockHp: 160, stockNm: 240, stage1Hp: 195, stage1Nm: 300 },
          { label: "GTI 2.0 TSI (210 KS)", stockHp: 210, stockNm: 280, stage1Hp: 255, stage1Nm: 355 },
          { label: "GTD 2.0 TDI (170 KS)", stockHp: 170, stockNm: 350, stage1Hp: 210, stage1Nm: 430 },
          { label: "R 2.0 TSI (270 KS)", stockHp: 270, stockNm: 350, stage1Hp: 325, stage1Nm: 430 },
        ],
      },
      {
        model: "Golf 7",
        engines: [
          { label: "1.6 TDI (110 KS)", stockHp: 110, stockNm: 250, stage1Hp: 145, stage1Nm: 315 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (184 KS)", stockHp: 184, stockNm: 380, stage1Hp: 225, stage1Nm: 460 },
          { label: "1.0 TSI (110 KS)", stockHp: 110, stockNm: 200, stage1Hp: 140, stage1Nm: 255 },
          { label: "1.4 TSI (125 KS)", stockHp: 125, stockNm: 200, stage1Hp: 160, stage1Nm: 255 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "GTI 2.0 TSI (220 KS)", stockHp: 220, stockNm: 350, stage1Hp: 270, stage1Nm: 420 },
          { label: "GTD 2.0 TDI (184 KS)", stockHp: 184, stockNm: 380, stage1Hp: 225, stage1Nm: 455 },
          { label: "R 2.0 TSI (300 KS)", stockHp: 300, stockNm: 380, stage1Hp: 355, stage1Nm: 460 },
        ],
      },
      {
        model: "Golf 8",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 360, stage1Hp: 190, stage1Nm: 430 },
          { label: "1.5 TSI (130 KS)", stockHp: 130, stockNm: 200, stage1Hp: 160, stage1Nm: 250 },
          { label: "GTI 2.0 TSI (245 KS)", stockHp: 245, stockNm: 370, stage1Hp: 295, stage1Nm: 450 },
          { label: "GTD 2.0 TDI (200 KS)", stockHp: 200, stockNm: 400, stage1Hp: 245, stage1Nm: 480 },
          { label: "R 2.0 TSI (320 KS)", stockHp: 320, stockNm: 420, stage1Hp: 380, stage1Nm: 500 },
        ],
      },
      {
        model: "Passat B7",
        engines: [
          { label: "2.0 TDI (140 KS)", stockHp: 140, stockNm: 320, stage1Hp: 178, stage1Nm: 395 },
          { label: "2.0 TDI (170 KS)", stockHp: 170, stockNm: 350, stage1Hp: 210, stage1Nm: 435 },
          { label: "1.8 TSI (160 KS)", stockHp: 160, stockNm: 250, stage1Hp: 195, stage1Nm: 310 },
          { label: "2.0 TSI (200 KS)", stockHp: 200, stockNm: 280, stage1Hp: 245, stage1Nm: 350 },
        ],
      },
      {
        model: "Passat B8",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "2.0 TDI (240 KS)", stockHp: 240, stockNm: 500, stage1Hp: 290, stage1Nm: 590 },
          { label: "1.8 TSI (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 215, stage1Nm: 320 },
          { label: "2.0 TSI (220 KS)", stockHp: 220, stockNm: 350, stage1Hp: 270, stage1Nm: 430 },
        ],
      },
      {
        model: "Tiguan",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "1.4 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "2.0 TSI (180 KS)", stockHp: 180, stockNm: 320, stage1Hp: 220, stage1Nm: 390 },
          { label: "2.0 TSI (220 KS)", stockHp: 220, stockNm: 350, stage1Hp: 270, stage1Nm: 430 },
        ],
      },
      {
        model: "Polo",
        engines: [
          { label: "1.0 TSI (95 KS)", stockHp: 95, stockNm: 175, stage1Hp: 120, stage1Nm: 220 },
          { label: "1.0 TSI (115 KS)", stockHp: 115, stockNm: 200, stage1Hp: 145, stage1Nm: 255 },
          { label: "GTI 2.0 TSI (207 KS)", stockHp: 207, stockNm: 320, stage1Hp: 250, stage1Nm: 390 },
        ],
      },
      {
        model: "T-Roc",
        engines: [
          { label: "1.6 TDI (115 KS)", stockHp: 115, stockNm: 250, stage1Hp: 148, stage1Nm: 315 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "2.0 TSI (190 KS)", stockHp: 190, stockNm: 320, stage1Hp: 235, stage1Nm: 395 },
        ],
      },
    ],
  },
  {
    make: "Mercedes-Benz",
    models: [
      {
        model: "A-Klasa",
        engines: [
          { label: "A180d (116 KS)", stockHp: 116, stockNm: 260, stage1Hp: 150, stage1Nm: 320 },
          { label: "A200d (150 KS)", stockHp: 150, stockNm: 320, stage1Hp: 185, stage1Nm: 395 },
          { label: "A180 (136 KS)", stockHp: 136, stockNm: 220, stage1Hp: 165, stage1Nm: 270 },
          { label: "A200 (163 KS)", stockHp: 163, stockNm: 250, stage1Hp: 200, stage1Nm: 310 },
          { label: "A250 (224 KS)", stockHp: 224, stockNm: 350, stage1Hp: 270, stage1Nm: 420 },
          { label: "A45 AMG (421 KS)", stockHp: 421, stockNm: 500, stage1Hp: 480, stage1Nm: 580 },
        ],
      },
      {
        model: "C-Klasa",
        engines: [
          { label: "C180d (122 KS)", stockHp: 122, stockNm: 270, stage1Hp: 160, stage1Nm: 335 },
          { label: "C200d (160 KS)", stockHp: 160, stockNm: 360, stage1Hp: 200, stage1Nm: 440 },
          { label: "C220d (170 KS)", stockHp: 170, stockNm: 400, stage1Hp: 215, stage1Nm: 480 },
          { label: "C220d (194 KS)", stockHp: 194, stockNm: 400, stage1Hp: 240, stage1Nm: 490 },
          { label: "C180 (156 KS)", stockHp: 156, stockNm: 250, stage1Hp: 190, stage1Nm: 305 },
          { label: "C200 (184 KS)", stockHp: 184, stockNm: 300, stage1Hp: 218, stage1Nm: 365 },
          { label: "C300 (258 KS)", stockHp: 258, stockNm: 370, stage1Hp: 305, stage1Nm: 445 },
          { label: "C43 AMG (390 KS)", stockHp: 390, stockNm: 520, stage1Hp: 450, stage1Nm: 600 },
          { label: "C63 AMG (476 KS)", stockHp: 476, stockNm: 650, stage1Hp: 540, stage1Nm: 730 },
        ],
      },
      {
        model: "E-Klasa",
        engines: [
          { label: "E200d (160 KS)", stockHp: 160, stockNm: 360, stage1Hp: 200, stage1Nm: 440 },
          { label: "E220d (194 KS)", stockHp: 194, stockNm: 400, stage1Hp: 240, stage1Nm: 490 },
          { label: "E200 (184 KS)", stockHp: 184, stockNm: 300, stage1Hp: 218, stage1Nm: 365 },
          { label: "E300 (258 KS)", stockHp: 258, stockNm: 370, stage1Hp: 305, stage1Nm: 445 },
          { label: "E400 (333 KS)", stockHp: 333, stockNm: 480, stage1Hp: 390, stage1Nm: 560 },
          { label: "E63 AMG S (612 KS)", stockHp: 612, stockNm: 850, stage1Hp: 690, stage1Nm: 950 },
        ],
      },
      {
        model: "GLC",
        engines: [
          { label: "GLC 200d (163 KS)", stockHp: 163, stockNm: 370, stage1Hp: 205, stage1Nm: 450 },
          { label: "GLC 220d (170 KS)", stockHp: 170, stockNm: 400, stage1Hp: 215, stage1Nm: 480 },
          { label: "GLC 300 (258 KS)", stockHp: 258, stockNm: 370, stage1Hp: 305, stage1Nm: 445 },
          { label: "GLC 43 AMG (390 KS)", stockHp: 390, stockNm: 520, stage1Hp: 450, stage1Nm: 600 },
        ],
      },
      {
        model: "GLE",
        engines: [
          { label: "GLE 300d (245 KS)", stockHp: 245, stockNm: 500, stage1Hp: 295, stage1Nm: 600 },
          { label: "GLE 350d (272 KS)", stockHp: 272, stockNm: 600, stage1Hp: 325, stage1Nm: 700 },
          { label: "GLE 400d (330 KS)", stockHp: 330, stockNm: 700, stage1Hp: 390, stage1Nm: 800 },
          { label: "GLE 63 AMG S (612 KS)", stockHp: 612, stockNm: 850, stage1Hp: 690, stage1Nm: 950 },
        ],
      },
    ],
  },
  {
    make: "Škoda",
    models: [
      {
        model: "Octavia",
        engines: [
          { label: "1.6 TDI (105 KS)", stockHp: 105, stockNm: 250, stage1Hp: 135, stage1Nm: 305 },
          { label: "2.0 TDI (115 KS)", stockHp: 115, stockNm: 270, stage1Hp: 150, stage1Nm: 340 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (184 KS)", stockHp: 184, stockNm: 380, stage1Hp: 225, stage1Nm: 455 },
          { label: "1.4 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "1.8 TSI (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 215, stage1Nm: 320 },
          { label: "2.0 TSI RS (220 KS)", stockHp: 220, stockNm: 350, stage1Hp: 270, stage1Nm: 425 },
          { label: "2.0 TSI RS (230 KS)", stockHp: 230, stockNm: 350, stage1Hp: 280, stage1Nm: 430 },
        ],
      },
      {
        model: "Superb",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "1.8 TSI (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 215, stage1Nm: 320 },
          { label: "2.0 TSI (220 KS)", stockHp: 220, stockNm: 350, stage1Hp: 270, stage1Nm: 425 },
        ],
      },
      {
        model: "Kodiaq",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "RS 2.0 TSI (245 KS)", stockHp: 245, stockNm: 370, stage1Hp: 295, stage1Nm: 450 },
        ],
      },
      {
        model: "Karoq",
        engines: [
          { label: "1.6 TDI (115 KS)", stockHp: 115, stockNm: 250, stage1Hp: 148, stage1Nm: 315 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
        ],
      },
      {
        model: "Fabia",
        engines: [
          { label: "1.0 TSI (95 KS)", stockHp: 95, stockNm: 175, stage1Hp: 120, stage1Nm: 220 },
          { label: "1.0 TSI (110 KS)", stockHp: 110, stockNm: 200, stage1Hp: 140, stage1Nm: 250 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
        ],
      },
    ],
  },
  {
    make: "Seat",
    models: [
      {
        model: "Leon",
        engines: [
          { label: "1.6 TDI (115 KS)", stockHp: 115, stockNm: 250, stage1Hp: 148, stage1Nm: 315 },
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (184 KS)", stockHp: 184, stockNm: 380, stage1Hp: 225, stage1Nm: 455 },
          { label: "1.4 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "1.8 TSI (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 215, stage1Nm: 320 },
          { label: "Cupra 2.0 TSI (265 KS)", stockHp: 265, stockNm: 350, stage1Hp: 320, stage1Nm: 430 },
          { label: "Cupra R 2.0 TSI (300 KS)", stockHp: 300, stockNm: 380, stage1Hp: 355, stage1Nm: 460 },
        ],
      },
      {
        model: "Ibiza",
        engines: [
          { label: "1.0 TSI (95 KS)", stockHp: 95, stockNm: 175, stage1Hp: 120, stage1Nm: 220 },
          { label: "1.0 TSI (115 KS)", stockHp: 115, stockNm: 200, stage1Hp: 148, stage1Nm: 255 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
        ],
      },
      {
        model: "Ateca",
        engines: [
          { label: "2.0 TDI (150 KS)", stockHp: 150, stockNm: 340, stage1Hp: 190, stage1Nm: 415 },
          { label: "2.0 TDI (190 KS)", stockHp: 190, stockNm: 400, stage1Hp: 235, stage1Nm: 480 },
          { label: "1.5 TSI (150 KS)", stockHp: 150, stockNm: 250, stage1Hp: 185, stage1Nm: 310 },
          { label: "Cupra 2.0 TSI (300 KS)", stockHp: 300, stockNm: 400, stage1Hp: 355, stage1Nm: 480 },
        ],
      },
    ],
  },
  {
    make: "Ford",
    models: [
      {
        model: "Focus",
        engines: [
          { label: "1.5 TDCi (120 KS)", stockHp: 120, stockNm: 270, stage1Hp: 155, stage1Nm: 335 },
          { label: "2.0 TDCi (150 KS)", stockHp: 150, stockNm: 370, stage1Hp: 185, stage1Nm: 450 },
          { label: "1.0 EcoBoost (100 KS)", stockHp: 100, stockNm: 170, stage1Hp: 130, stage1Nm: 215 },
          { label: "1.5 EcoBoost (150 KS)", stockHp: 150, stockNm: 240, stage1Hp: 185, stage1Nm: 300 },
          { label: "ST 2.0 EcoBoost (250 KS)", stockHp: 250, stockNm: 360, stage1Hp: 300, stage1Nm: 435 },
        ],
      },
      {
        model: "Mondeo",
        engines: [
          { label: "2.0 TDCi (150 KS)", stockHp: 150, stockNm: 370, stage1Hp: 185, stage1Nm: 450 },
          { label: "2.0 TDCi (180 KS)", stockHp: 180, stockNm: 400, stage1Hp: 220, stage1Nm: 480 },
          { label: "2.0 EcoBoost (203 KS)", stockHp: 203, stockNm: 300, stage1Hp: 245, stage1Nm: 370 },
        ],
      },
      {
        model: "Kuga",
        engines: [
          { label: "2.0 TDCi (150 KS)", stockHp: 150, stockNm: 370, stage1Hp: 185, stage1Nm: 450 },
          { label: "2.0 TDCi (180 KS)", stockHp: 180, stockNm: 400, stage1Hp: 220, stage1Nm: 480 },
          { label: "1.5 EcoBoost (150 KS)", stockHp: 150, stockNm: 240, stage1Hp: 185, stage1Nm: 300 },
        ],
      },
      {
        model: "Fiesta",
        engines: [
          { label: "1.0 EcoBoost (100 KS)", stockHp: 100, stockNm: 170, stage1Hp: 130, stage1Nm: 215 },
          { label: "1.0 EcoBoost (125 KS)", stockHp: 125, stockNm: 200, stage1Hp: 158, stage1Nm: 255 },
          { label: "ST 1.5 EcoBoost (200 KS)", stockHp: 200, stockNm: 290, stage1Hp: 240, stage1Nm: 360 },
        ],
      },
    ],
  },
  {
    make: "Opel",
    models: [
      {
        model: "Astra",
        engines: [
          { label: "1.6 CDTi (136 KS)", stockHp: 136, stockNm: 320, stage1Hp: 170, stage1Nm: 395 },
          { label: "2.0 CDTi (165 KS)", stockHp: 165, stockNm: 350, stage1Hp: 205, stage1Nm: 430 },
          { label: "1.4 Turbo (150 KS)", stockHp: 150, stockNm: 230, stage1Hp: 185, stage1Nm: 285 },
          { label: "OPC 2.0 Turbo (280 KS)", stockHp: 280, stockNm: 400, stage1Hp: 330, stage1Nm: 480 },
        ],
      },
      {
        model: "Insignia",
        engines: [
          { label: "2.0 CDTi (130 KS)", stockHp: 130, stockNm: 300, stage1Hp: 165, stage1Nm: 370 },
          { label: "2.0 CDTi (163 KS)", stockHp: 163, stockNm: 350, stage1Hp: 200, stage1Nm: 430 },
          { label: "2.0 Turbo (220 KS)", stockHp: 220, stockNm: 320, stage1Hp: 265, stage1Nm: 390 },
          { label: "OPC 2.8 Turbo (325 KS)", stockHp: 325, stockNm: 435, stage1Hp: 380, stage1Nm: 520 },
        ],
      },
      {
        model: "Corsa",
        engines: [
          { label: "1.2 Turbo (100 KS)", stockHp: 100, stockNm: 175, stage1Hp: 130, stage1Nm: 225 },
          { label: "1.2 Turbo (130 KS)", stockHp: 130, stockNm: 230, stage1Hp: 165, stage1Nm: 290 },
          { label: "1.5 CDTi (102 KS)", stockHp: 102, stockNm: 250, stage1Hp: 135, stage1Nm: 310 },
        ],
      },
    ],
  },
  {
    make: "Hyundai",
    models: [
      {
        model: "i30",
        engines: [
          { label: "1.6 CRDi (136 KS)", stockHp: 136, stockNm: 320, stage1Hp: 170, stage1Nm: 395 },
          { label: "1.5 T-GDi (160 KS)", stockHp: 160, stockNm: 253, stage1Hp: 195, stage1Nm: 315 },
          { label: "N 2.0 T-GDi (280 KS)", stockHp: 280, stockNm: 392, stage1Hp: 325, stage1Nm: 460 },
          { label: "N 2.0 T-GDi (300 KS)", stockHp: 300, stockNm: 392, stage1Hp: 345, stage1Nm: 460 },
        ],
      },
      {
        model: "Tucson",
        engines: [
          { label: "2.0 CRDi (185 KS)", stockHp: 185, stockNm: 400, stage1Hp: 225, stage1Nm: 480 },
          { label: "1.6 T-GDi (177 KS)", stockHp: 177, stockNm: 265, stage1Hp: 215, stage1Nm: 330 },
          { label: "1.6 T-GDi (265 KS)", stockHp: 265, stockNm: 350, stage1Hp: 315, stage1Nm: 425 },
        ],
      },
      {
        model: "Kona",
        engines: [
          { label: "1.0 T-GDi (120 KS)", stockHp: 120, stockNm: 172, stage1Hp: 155, stage1Nm: 225 },
          { label: "1.6 T-GDi (198 KS)", stockHp: 198, stockNm: 265, stage1Hp: 235, stage1Nm: 330 },
          { label: "N 2.0 T-GDi (280 KS)", stockHp: 280, stockNm: 392, stage1Hp: 325, stage1Nm: 460 },
        ],
      },
    ],
  },
  {
    make: "Renault",
    models: [
      {
        model: "Megane",
        engines: [
          { label: "1.5 dCi (110 KS)", stockHp: 110, stockNm: 260, stage1Hp: 145, stage1Nm: 325 },
          { label: "1.6 dCi (165 KS)", stockHp: 165, stockNm: 380, stage1Hp: 200, stage1Nm: 455 },
          { label: "RS 1.8T (280 KS)", stockHp: 280, stockNm: 390, stage1Hp: 330, stage1Nm: 460 },
          { label: "RS Trophy 1.8T (300 KS)", stockHp: 300, stockNm: 420, stage1Hp: 355, stage1Nm: 500 },
        ],
      },
      {
        model: "Clio",
        engines: [
          { label: "1.5 dCi (90 KS)", stockHp: 90, stockNm: 220, stage1Hp: 120, stage1Nm: 275 },
          { label: "1.3 TCe (131 KS)", stockHp: 131, stockNm: 240, stage1Hp: 160, stage1Nm: 300 },
          { label: "RS 1.6T (200 KS)", stockHp: 200, stockNm: 280, stage1Hp: 245, stage1Nm: 350 },
        ],
      },
      {
        model: "Kadjar",
        engines: [
          { label: "1.5 dCi (110 KS)", stockHp: 110, stockNm: 260, stage1Hp: 145, stage1Nm: 325 },
          { label: "1.6 dCi (130 KS)", stockHp: 130, stockNm: 320, stage1Hp: 165, stage1Nm: 395 },
          { label: "1.3 TCe (140 KS)", stockHp: 140, stockNm: 260, stage1Hp: 175, stage1Nm: 325 },
        ],
      },
    ],
  },
  {
    make: "Peugeot",
    models: [
      {
        model: "308",
        engines: [
          { label: "1.5 BlueHDi (130 KS)", stockHp: 130, stockNm: 300, stage1Hp: 165, stage1Nm: 375 },
          { label: "2.0 HDi (150 KS)", stockHp: 150, stockNm: 370, stage1Hp: 185, stage1Nm: 455 },
          { label: "1.6 THP (165 KS)", stockHp: 165, stockNm: 240, stage1Hp: 200, stage1Nm: 300 },
          { label: "GTi 1.6 THP (270 KS)", stockHp: 270, stockNm: 330, stage1Hp: 315, stage1Nm: 400 },
        ],
      },
      {
        model: "3008",
        engines: [
          { label: "1.5 BlueHDi (130 KS)", stockHp: 130, stockNm: 300, stage1Hp: 165, stage1Nm: 375 },
          { label: "2.0 BlueHDi (180 KS)", stockHp: 180, stockNm: 400, stage1Hp: 220, stage1Nm: 480 },
          { label: "1.6 PureTech (180 KS)", stockHp: 180, stockNm: 250, stage1Hp: 220, stage1Nm: 310 },
        ],
      },
    ],
  },
  {
    make: "Toyota",
    models: [
      {
        model: "GR Yaris",
        engines: [
          { label: "1.6 GR (261 KS)", stockHp: 261, stockNm: 360, stage1Hp: 310, stage1Nm: 430 },
          { label: "1.6 GR Circuit (272 KS)", stockHp: 272, stockNm: 370, stage1Hp: 320, stage1Nm: 440 },
        ],
      },
      {
        model: "Supra",
        engines: [
          { label: "3.0T B58 (340 KS)", stockHp: 340, stockNm: 500, stage1Hp: 420, stage1Nm: 590 },
          { label: "3.0T B58 (387 KS)", stockHp: 387, stockNm: 500, stage1Hp: 460, stage1Nm: 600 },
        ],
      },
      {
        model: "GR86",
        engines: [
          { label: "2.4 FA24 (234 KS)", stockHp: 234, stockNm: 250, stage1Hp: 268, stage1Nm: 295 },
        ],
      },
    ],
  },
]

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
      </svg>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function VehicleLookup() {
  const [make, setMake] = useState("")
  const [modelName, setModelName] = useState("")
  const [engineLabel, setEngineLabel] = useState("")
  const [result, setResult] = useState<EngineSpec | null>(null)
  const [animateBars, setAnimateBars] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const [countHp, setCountHp] = useState(0)
  const [countNm, setCountNm] = useState(0)

  // Trigger bar animation + number count-up when result appears
  useEffect(() => {
    if (!result) { setAnimateBars(false); setCountHp(0); setCountNm(0); return }
    setAnimateBars(false)
    setCountHp(result.stockHp)
    setCountNm(result.stockNm)
    const t = setTimeout(() => setAnimateBars(true), 80)
    return () => clearTimeout(t)
  }, [result])

  useEffect(() => {
    if (!animateBars || !result) return
    const duration = 900
    const steps = 40
    const interval = duration / steps
    const hpStep = (result.stage1Hp - result.stockHp) / steps
    const nmStep = (result.stage1Nm - result.stockNm) / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setCountHp(Math.round(result.stockHp + hpStep * Math.min(step, steps)))
      setCountNm(Math.round(result.stockNm + nmStep * Math.min(step, steps)))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [animateBars, result])

  const models = database.find((m) => m.make === make)?.models ?? []
  const engines = models.find((m) => m.model === modelName)?.engines ?? []

  const handleMakeChange = (v: string) => {
    setMake(v)
    setModelName("")
    setEngineLabel("")
    setResult(null)
  }

  const handleModelChange = (v: string) => {
    setModelName(v)
    setEngineLabel("")
    setResult(null)
  }

  const handleEngineChange = (v: string) => {
    setEngineLabel(v)
    if (!v) { setResult(null); return }
    const eng = engines.find((e) => e.label === v) ?? null
    setResult(eng)
  }

  const hpGain = result ? result.stage1Hp - result.stockHp : 0
  const nmGain = result ? result.stage1Nm - result.stockNm : 0
  const hpPct = result ? Math.round((hpGain / result.stockHp) * 100) : 0
  const nmPct = result ? Math.round((nmGain / result.stockNm) * 100) : 0

  // Bar widths — scaled so 40% gain fills ~85% of bar
  const hpBarW = animateBars ? Math.min(95, (hpPct / 45) * 100) : 0
  const nmBarW = animateBars ? Math.min(95, (nmPct / 45) * 100) : 0

  const waText = result
    ? `Zdravo! Zanima me chiptuning Stage 1 za ${make} ${modelName} ${result.label}. Možemo li dogovoriti termin?`
    : ""

  return (
    <section
      ref={sectionRef}
      id="vehicle-lookup"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[oklch(0.14_0_0)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.20 0 0), transparent)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">
            Chiptuning kalkulator
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light tracking-[-0.03em] text-foreground">
            Koliko možeš dobiti?
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
            Izaberi marku, model i motor — videćeš procenjene vrednosti Stage 1 chiptuning remapa za tvoje vozilo.
          </p>
        </div>

        {/* Selects */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Make */}
          <div className="relative">
            <select
              value={make}
              onChange={(e) => handleMakeChange(e.target.value)}
              className="w-full appearance-none bg-secondary border border-border text-sm px-4 py-4 pr-10 rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-foreground/30 text-foreground hover:bg-accent transition-colors"
            >
              <option value="" className="bg-[oklch(0.18_0_0)]">Marka vozila</option>
              {database.map((m) => (
                <option key={m.make} value={m.make} className="bg-[oklch(0.18_0_0)]">
                  {m.make}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>

          {/* Model */}
          <div className="relative">
            <select
              value={modelName}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={!make}
              className={`w-full appearance-none bg-secondary border border-border text-sm px-4 py-4 pr-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors ${
                !make
                  ? "opacity-40 cursor-not-allowed text-muted-foreground"
                  : "cursor-pointer text-foreground hover:bg-accent"
              }`}
            >
              <option value="" className="bg-[oklch(0.18_0_0)]">Model</option>
              {models.map((m) => (
                <option key={m.model} value={m.model} className="bg-[oklch(0.18_0_0)]">
                  {m.model}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>

          {/* Engine */}
          <div className="relative">
            <select
              value={engineLabel}
              onChange={(e) => handleEngineChange(e.target.value)}
              disabled={!modelName}
              className={`w-full appearance-none bg-secondary border border-border text-sm px-4 py-4 pr-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors ${
                !modelName
                  ? "opacity-40 cursor-not-allowed text-muted-foreground"
                  : "cursor-pointer text-foreground hover:bg-accent"
              }`}
            >
              <option value="" className="bg-[oklch(0.18_0_0)]">Motor</option>
              {engines.map((e) => (
                <option key={e.label} value={e.label} className="bg-[oklch(0.18_0_0)]">
                  {e.label}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Result card */}
        <div
          className={`transition-all duration-700 ${
            result ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          {result && (
            <div className="border border-border rounded-sm overflow-hidden">

              {/* Card header */}
              <div className="bg-secondary px-6 py-4 border-b border-border">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
                  {make} · {modelName}
                </p>
                <p className="text-foreground text-sm mt-0.5">{result.label}</p>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-center mb-8">

                  {/* Stock */}
                  <div className="md:pr-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--muted-foreground)", opacity: 0.6, fontFamily: "var(--font-dm-mono)" }}>
                      Serijska
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl leading-none tabular-nums" style={{ fontFamily: "var(--font-bebas)", color: "var(--muted-foreground)", letterSpacing: "0.02em" }}>
                          {result.stockHp}
                        </span>
                        <span className="text-sm" style={{ color: "var(--muted-foreground)", opacity: 0.6, fontFamily: "var(--font-dm-mono)" }}>KS</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl leading-none tabular-nums" style={{ fontFamily: "var(--font-bebas)", color: "var(--muted-foreground)", opacity: 0.7, letterSpacing: "0.02em" }}>
                          {result.stockNm}
                        </span>
                        <span className="text-sm" style={{ color: "var(--muted-foreground)", opacity: 0.5, fontFamily: "var(--font-dm-mono)" }}>Nm</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex flex-col items-center gap-1 px-6">
                    <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                      <path d="M0 8H36M36 8L30 2M36 8L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60" />
                    </svg>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60">Stage 1</span>
                  </div>

                  {/* Stage 1 */}
                  <div className="md:pl-8 md:border-l border-border/30">
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--brand)", fontFamily: "var(--font-dm-mono)" }}>
                      Stage 1
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl leading-none tabular-nums" style={{ fontFamily: "var(--font-bebas)", color: "var(--foreground)", letterSpacing: "0.02em" }}>
                            {countHp}
                          </span>
                          <span className="text-sm" style={{ color: "var(--muted-foreground)", opacity: 0.6, fontFamily: "var(--font-dm-mono)" }}>KS</span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5"
                          style={{
                            background: "var(--brand-subtle)",
                            border: "1px solid var(--brand-dim)",
                            color: "var(--brand)",
                            fontFamily: "var(--font-dm-mono)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          +{hpGain} KS (+{hpPct}%)
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl leading-none tabular-nums" style={{ fontFamily: "var(--font-bebas)", color: "var(--foreground)", opacity: 0.8, letterSpacing: "0.02em" }}>
                            {countNm}
                          </span>
                          <span className="text-sm" style={{ color: "var(--muted-foreground)", opacity: 0.5, fontFamily: "var(--font-dm-mono)" }}>Nm</span>
                        </div>
                        <span className="text-xs" style={{ color: "var(--brand)", opacity: 0.8, fontFamily: "var(--font-dm-mono)" }}>
                          +{nmGain} Nm (+{nmPct}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gain bars */}
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--muted-foreground)", opacity: 0.7, fontFamily: "var(--font-dm-mono)" }}>Snaga</span>
                      <span className="text-xs tabular-nums" style={{ color: "var(--brand)", fontFamily: "var(--font-dm-mono)" }}>+{hpPct}%</span>
                    </div>
                    <div className="h-[4px] overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full transition-[width] duration-1000 ease-out"
                        style={{
                          width: `${hpBarW}%`,
                          background: "var(--brand)",
                          boxShadow: "0 0 8px var(--brand)",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--muted-foreground)", opacity: 0.7, fontFamily: "var(--font-dm-mono)" }}>Obrtni moment</span>
                      <span className="text-xs tabular-nums" style={{ color: "var(--brand)", opacity: 0.85, fontFamily: "var(--font-dm-mono)" }}>+{nmPct}%</span>
                    </div>
                    <div className="h-[4px] overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full transition-[width] duration-1000 delay-150 ease-out"
                        style={{
                          width: `${nmBarW}%`,
                          background: "oklch(0.55 0.18 40)",
                          boxShadow: "0 0 8px oklch(0.55 0.18 40)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA block — visually separated footer of the card */}
              <div className="bg-secondary/60 border-t border-border px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-sm">
                  * Procenjene vrednosti za Stage 1 softverski remap. Konačni rezultati zavise od stanja vozila.
                </p>
                <a
                  href={`https://wa.me/381628727274?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-8 py-3 text-xs tracking-[0.12em] uppercase transition-opacity duration-300 hover:opacity-85 font-medium"
                  style={{ background: "var(--brand)", color: "oklch(0.08 0 0)" }}
                >
                  Zakaži chiptuning
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {!result && (
          <div
            className={`border border-dashed border-border/60 rounded-sm py-16 flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-muted-foreground/60 text-sm tracking-[0.1em]">
              Izaberi vozilo iznad da vidiš rezultate
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
