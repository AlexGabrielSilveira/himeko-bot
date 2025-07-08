import { EmbedBuilder } from "discord.js";
import { MatchInfos, RiotAccountInterface } from "../interfaces/riot";

export function createMatchEmbed(matchInfo: MatchInfos, {nickname, tagline} : RiotAccountInterface) {
  const blueSide = matchInfo.participants.filter((_, i) => i < 5);
  const redSide = matchInfo.participants.filter((_, i) => i >= 5);

  const formatParticipant = (p: typeof blueSide[0]) =>
    `**${p.championName}** (Lv ${p.champLevel}) - *${p.lane}*\n` +
    `**K/D/A**: ${p.kills}/${p.deaths}/${p.assists} \n **GOLD:** ${p.goldEarned.toLocaleString()}`;

  const embed = new EmbedBuilder()
    .setTitle(
      `${nickname}- ${
        matchInfo.gameType === "MATCHED_GAME" ? "RANKED SOLO/DUO" : matchInfo.gameType
      }`
    )
    .setDescription(`Versão: ${matchInfo.gameVersion}`)
    .addFields(
      {
        name: "Duração ⏳",
        value: `${Math.floor(matchInfo.gameDuration / 60)}m ${matchInfo.gameDuration % 60}s`,
      },
      // {
      //   name: "Times (Bans)",
      //   value: matchInfo.teams
      //     .map(
      //       (team, idx) =>
      //         `Time ${idx + 1}: ${team.bans
      //           .map((ban) => `ChampID:${ban.championId}`)
      //           .join(", ")}`
      //     )
      //     .join("\n"),
      //   inline: false,
      // }
      {
        name: "Blue Side 🟦",
        value: blueSide.map(formatParticipant).join("\n\n"),
        inline: true,
      },
      {
        name: "Red Side 🟥",
        value: redSide.map(formatParticipant).join("\n\n"),
        inline: true,
      }
    )
    .setColor("#5865F2")
    .setTimestamp();

  return embed;
}
