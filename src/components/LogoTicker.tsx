import { motion } from "framer-motion";

const COL_1 = [
  "682fa15acc46e85b4628dac4_66f905a26976f830c4f09ce0_66f68e1716301fe5fbcaf913_arc.avif",
  "682fa15990e2182bed29afc5_67ff6a595c7f5fa0543ac014_canva.avif",
  "682fa15945a409e0dfc4c199_67ff6a747935a6d5b45ae7ab_classroom.avif",
  "684074ed827018860db775ff_claude.avif",
  "682fa15be5861424f5a1781c_66f905a26976f830c4f09ce7_66f68e1748e85e5cd5ad4836_cursor-ide.webp",
  "682fa15c64062ea5ed7ac37f_66f905a3dbb551f6de41ecfa_66f68e175dc32d8b4026221f_docs.webp",
  "682fa15c41f1171f872a854c_67ff6ac9e463fd7e256c772e_evernote.avif",
];
const COL_2 = [
  "682fa15c01329017a6cd4207_66f905a314a3d22ffc79f5bb_66f68e17c9064d5bd54f9b70_figma.webp",
  "682fa15c3d0d2af87f3144c3_66f905a355f7927357ab3fe5_66f68e173a4a571f65edcae0_gmail.webp",
  "682fa159637a35511b194ad6_67ff6a9a1f19ba3fe88cc9f2_google-keep.avif",
  "682fa159df8f792cb8c017f8_67ff6a26fb1a6b441e444234_grammarly.avif",
  "682fa15c2119568f9b39a7b9_66f905a3cf9938934f4f59c1_66f68e17dc93ecbd8015d769_imessage.avif",
  "682fa15d727b1a32763bda69_66f905a31c37f36fc8f52728_66f68e174a382e4768a0b863_insta.avif",
  "682fa15d435d03cee7af19ca_66f905a435c53060338eb7e4_66f68e17f4ab7655beb551d1_linear.avif",
];
const COL_3 = [
  "682fa15db1b777333c5341db_66f905a4cf9938934f4f5a54_66f68e17f4ab7655beb551db_mail.avif",
  "682fa15e07bd6278b0483e31_66f905a5044c5c83e11ab6e5_66f68e17a503a81a1bf73236_messenger.avif",
  "682fa15e74b9d5cdb7979532_66f905a5580abe1aff89d634_66f68e17eebe9ae404993b0e_notion.avif",
  "682fa15fef4d27826a8e9381_66f905a51fcb54901686c2e9_66f68e1703a2e69ac58dc962_obsidian.webp",
  "682fa1581dfebe56a045dcb4_67ff6aafed300ca598592862_onenote.avif",
  "682fa15fa5f115e2d084687e_66f905a617c8c744badff0ee_66f68e17aa17c8a36735da81_outlook.webp",
  "682fa15e1335b859677a339d_66f905a535c53060338eb899_66f68e178c917a819475d8c1_perplexity.avif",
];
const COL_4 = [
  "682fa15f1b52c91cb9a50f16_66f905a5580abe1aff89d677_66f68e173a4a571f65edcb13_raycast.webp",
  "682fa15fdf2782e8df1e5cbc_66f905a61c37f36fc8f52932_66f68e1716301fe5fbcaf935_replit.webp",
  "682fa160b1b777333c5342fa_66f905a6cf9938934f4f5c4d_66f68e18773e1391d4059ca9_signal.avif",
  "682fa160df8f792cb8c01c58_66f905a6bb0f45ece8cca30d_66f68e173a4a571f65edcb07_slack.webp",
  "682fa160b4d05a8880c2c407_66f905a631bbec4cdf4801e7_66f68e17cf1e00e686504c6e_snap.webp",
  "682fa161746ade96181abaf8_66f905a7dbb551f6de41f176_66f68e17d61b7dc3541ab787_superhuman.avif",
  "682fa1612b39359a238c5b7f_66f905a817c8c744badff37e_66f68e17eebe9ae404993b2c_teams.webp",
];
const COL_5 = [
  "682fa1612deb88ce9dde9aa2_66f905a85ab822134a859404_66f68e18f25aff2304af72d7_telegram.avif",
  "682fa161053862bf16064f4e_66f905a8e29ddb03b9efbe0c_66f68e1721bc1fbd02c88e3c_things.webp",
  "682fa16150b4ca6070d1ce33_66f905a81c37f36fc8f52a6e_66f68e188b921eea06d1aa3e_todolist.avif",
  "682fa161435d03cee7af1c72_66f905a86b111f07521d2e54_66f68e17a239e3a98d6f0780_vscode.webp",
  "682fa161e3fbcf9d836fd6b3_66f905aafd2ca9b6dddd0edf_66f68e17102667380d0d8865_whatsapp.avif",
  "682fa162192facb6a666750e_66f905a8e9e4ff2af1fa60b9_66f68e1766846fa7ed88fa56_x.avif",
  "682fa15adc306ab5bf96b30e_67ff6a871792c333db148107_zoom.avif",
  "6840755f6a81b45af532d07d_chatgpt.avif",
  "682fa15c435d03cee7af192d_66f905a3e29ddb03b9efbb9a_66f68e1757b01079e67f1e54_github.webp",
  "683292faea21a80a4ec2ab80_apple_symbol-dark.svg",
];

const COLUMNS = [
  { logos: COL_1, speed: "26s", dir: "down" },
  { logos: COL_2, speed: "32s", dir: "up" },
  { logos: COL_3, speed: "29s", dir: "down" },
  { logos: COL_4, speed: "35s", dir: "up" },
  { logos: COL_5, speed: "28s", dir: "down" },
];

export default function LogoTicker() {
  return (
    <section className="py-20 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* Left: logo marquee */}
          <div
            className="flex gap-4 sm:gap-5 justify-center h-[360px] lg:h-[520px] relative"
            style={{
              maskImage: "radial-gradient(ellipse 80% 46% at center, black 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 46% at center, black 60%, transparent 100%)",
            }}
          >
            <style>{`
              @keyframes marquee-up {
                from { transform: translateY(0); }
                to { transform: translateY(-50%); }
              }
              @keyframes marquee-down {
                from { transform: translateY(-50%); }
                to { transform: translateY(0); }
              }
            `}</style>

            {COLUMNS.map((col, ci) => (
              <div key={ci} className="flex-none overflow-hidden">
                <div
                  className="flex flex-col gap-4 sm:gap-5 lg:gap-6"
                  style={{
                    animation: `${col.dir === "up" ? "marquee-up" : "marquee-down"} ${col.speed} linear infinite`,
                  }}
                >
                  {[...col.logos, ...col.logos].map((logo, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-xl bg-white border border-warm-200 shadow-sm flex items-center justify-center p-3 shrink-0"
                    >
                      <img
                        src={`/pics/${logo}`}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-warm-900"
            >
              Used by thousands
              <br />
              of people who&apos;d
              <br />
              rather talk.
            </motion.h2>
            <p className="mt-4 text-base leading-relaxed text-warm-500 max-w-sm">
              From engineers shipping PRs to founders writing investor updates. From
              students taking notes to writers drafting their next piece. maple fits
              into every workflow, in every app, on every platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
