import * as app from "../app"

const command: app.Command = {
  name: "avatar",
  description: "Affiche l'avatar d'un membre",
  positional: [
    {
      name: "user",
      description:
        "L'id ou le pseudo du membre du quel on veut afficher l'avatar",
      checkValue: (value) => value.length > 2,
      castValue: async (value, message) => {
        return message.client.users.resolve(
          message.mentions.members?.first() ||
            message.mentions.users.first() ||
            (await message.client.users.fetch(value)) ||
            (await message.guild.members.fetch({ query: value })).first()
        )
      },
      default: (message) => message.author.id,
    },
  ],
  async run(message) {
    const user = message.positional.user
    const embed = new app.MessageEmbed()
      .setColor(message.guild?.me?.roles.color?.color ?? "#c800ff")
      .setTitle("Voici l'avatar de " + user.username)
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setImage(
        user.displayAvatarURL({
          dynamic: true,
          size: 256,
        })
      )
      .setTimestamp()
    await message.channel.send(embed)
    await message.delete()
  },
}

module.exports = command
