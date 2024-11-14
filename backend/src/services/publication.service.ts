import { ObjectId } from 'mongodb'
import { mongoDataSource } from 'src/main'
import { Publication } from 'src/models/publication.model'
import { UserService } from 'src/services/user.service'
import {Comment } from 'src/models/comment.model'
import * as fs from 'fs'; 
export class PublicationService {

  async getPublications(): Promise<Publication[]> {
    const PublicationRepo = mongoDataSource.getRepository(Publication)
    let publications = await PublicationRepo.find()
    for (let publication of publications) {
      console.log(publication.author)
      publication.authorName = await this.getAuthorName(publication.author)
     // console.log("LIGNE 15 : Test this.getAuthorName(publication.author): " + publication.authorName);
      // si publication.likes est null ou undefined, initialiser à []
      if (publication.likes === null || publication.likes === undefined) {
        publication.likes = []
      }
      // si publication.comments est null ou undefined, initialiser à []
      if (publication.comments === null || publication.comments === undefined) {
        publication.comments = []
      }
      // si non, parcourir le tableau des commentaires et remplacer le id de l'autheur par le nom de l'auteur du commentaire
      for (let comment of publication.comments) {
        // faire une requette pour recuperer le nom de l'auteur du commentaire par son id qui se trouve dans le tableau des commentaires
        //console.log("line 26 comment.author : "+comment.author);

        comment.authorName = await this.getAuthorName(comment.author);

        //console.log("line 30 comment.authorName : "+comment.authorName);
      }
    }
    return publications
  }

  async addPublication(title: string, author: ObjectId, image: string, content : string): Promise<Publication> {
    const publicationRepo = mongoDataSource.getRepository(Publication)
    const publication = new Publication()
    publication.title = title
    publication.author = new ObjectId(author)
    publication.image = image
    publication.authorName = await this.getAuthorName(author)

    const buffer = Buffer.from(content, 'base64');
    const fd = fs.openSync(`images/${image}`, "w");
    const position = 0;
    fs.writeSync(fd, buffer, position)
    return publicationRepo.save(publication)
  }

  async editTitle(publicationId: ObjectId, title: string) : Promise<boolean | Publication>
  {
    const publicationRepo = mongoDataSource.getRepository(Publication);
    const publication = await publicationRepo.findOneBy({_id: new ObjectId(publicationId)})
    if (!publication)
    {
      return false;
    }

    await publicationRepo.update({_id: new ObjectId(publicationId)}, {title: title})
    return publication
  }

  async deletePublication(publicationId: ObjectId) : Promise<boolean>
  {
    const publicationRepo = mongoDataSource.getRepository(Publication);
    const result = await publicationRepo.delete({_id: publicationId})
    return result.affected > 0;
  }

  // get name of author from publication author id
  async getAuthorName(authorId: ObjectId): Promise<string> {
    const userService = new UserService();
    return userService.getUserName(authorId);
  }

  // add comment to publication
  async addComment(publicationId: string, userId: string, text: string): Promise<Publication> {
    // tester le type de publicationId pour savoir si c'est un ObjectId
    const publicationObjectId = new ObjectId(publicationId);
    // if (!ObjectId.isValid(publicationObjectId)) {
    //   throw new Error('Invalid publicationId format');
    // }
    const userObjectId = new ObjectId(userId);
    if (!ObjectId.isValid(userObjectId)) {
      throw new Error('Invalid userId format');
    }
    const publicationRepo = mongoDataSource.getRepository(Publication)
    // tester si publicationRepo est null
    if (!publicationRepo) {
      throw new Error('Publication repository not found');
    }
    // récupérer la publication correspondant à l'identifiant 65bf8b868c1b85e422a45841 dans la collection publications
    let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } })
    if (publication) {
      // si la publication est récupérée, créer un commentaire avec l'identifiant de l'utilisateur et le texte
      const comment = new Comment()
      comment.author = userObjectId
      comment.text = text
      // ajouter le commentaire au tableau de commentaires de la publication
      publication.addComment(comment)
      // sauvegarder et retourner la publication dans la collection publications
      return publicationRepo.save(publication)
    } else {
      // sinon, retourner une erreur 404 avec le message "Publication not found" suivi du publicationObjectId
      throw new Error('Publication not found ' + publicationObjectId.toString())
    }
  }

  /**
   * La fonction async addLike prend en paramètre l'identifiant de la publication et l'identifiant de l'utilisateur qui a aimé la publication.
   * Elle récupère la publication correspondant à l'identifiant. Si la publication est recupérée elle ajoute directement dans Mondodb l'identifiant de l'utilisateur dans le tableau 
   * des likes de la publication et retourne la taille du tableau.
   * Si la publication n'est pas récupérée, la fonction retourne l'erreur HTTP 404 avec le message "Publication not found".
   * @param publicationId 
   * @param userId 
   * @returns la taille du tableau des likes de la publication si le like a été ajouté avec succès. Sinon, retourne l'erreur HTTP 404 avec le message "Publication not found".
   * 
   */
  async addLike(publicationId: string, userId: string): Promise<Number> {
    // tester le type de publicationId pour savoir si c'est un ObjectId
    const publicationObjectId = new ObjectId(publicationId);
    if (!ObjectId.isValid(publicationObjectId)) {
      throw new Error('Invalid publicationId format');
    }
    const userObjectId = new ObjectId(userId);
    if (!ObjectId.isValid(userObjectId)) {
      throw new Error('Invalid userId format');
    }
    const publicationRepo = mongoDataSource.getRepository(Publication)
    // tester si publicationRepo est null
    if (!publicationRepo) {
      throw new Error('Publication repository not found');
    }
    // récupérer la publication correspondant à l'identifiant 65bf8b868c1b85e422a45841 dans la collection publications
    let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } })
    if (publication) {
      // si la publication est récupérée, ajouter l'identifiant de l'utilisateur dans le tableau des likes de la publication
      publication = publication.addLike(userObjectId)
      // sauvegarder la publication dans la collection publications
      publicationRepo.save(publication)
      // retourner la taille du tableau des likes de la publication
      return publication.likes.length
    } else {
      // sinon, retourner une erreur 404 avec le message "Publication not found" suivi du publicationObjectId
      throw new Error('Publication not found ' + publicationObjectId.toString())
    }
  }


  async dislike(publicationId: ObjectId, userId: ObjectId): Promise<Number> {
    // tester le type de publicationId pour savoir si c'est un ObjectId
    const publicationObjectId = new ObjectId(publicationId);
    if (!ObjectId.isValid(publicationObjectId)) {
      throw new Error('Invalid publicationId format');
    }
    const userObjectId = new ObjectId(userId);
    if (!ObjectId.isValid(userObjectId)) {
      throw new Error('Invalid userId format');
    }
    const publicationRepo = mongoDataSource.getRepository(Publication)
    // tester si publicationRepo est null
    if (!publicationRepo) {
      throw new Error('Publication repository not found');
    }
    // récupérer la publication correspondant à l'identifiant 65bf8b868c1b85e422a45841 dans la collection publications
    let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } })
    if (publication) {
      // si la publication est récupérée, ajouter l'identifiant de l'utilisateur dans le tableau des likes de la publication
      publication = publication.dislike(userObjectId)
      // sauvegarder la publication dans la collection publications
      publicationRepo.save(publication)
      // retourner la taille du tableau des likes de la publication
      return publication.likes.length
    } else {
      // sinon, retourner une erreur 404 avec le message "Publication not found" suivi du publicationObjectId
      throw new Error('Publication not found ' + publicationObjectId.toString())
    }
  }

}

