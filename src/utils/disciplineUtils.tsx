const disciplinesEmojis = [
	{
		name: "Push",
		emoji: "🦶"
	},
	{
		name: "Paddle",
		emoji: "🛶"
	},
	{
		name: "Paddle-Push",
		emoji: "🛶"
	},
	{
		name: "Snakeboard",
		emoji: "🐍"
	}
]

export const getDisciplineEmoji = (discipline: string) => {
	const emoji = disciplinesEmojis.find(item => item.name === discipline)
	return emoji ? emoji.emoji : ""
}
