1.  **Gatsby**

    The site's now built using [Gatsby](https://www.gatsbyjs.com/). This shouldn't change much in terms of updating it, but means things are differently organised vs. 2020.

2.  **Modifying**

    From the site’s directory run

    ```shell
    npm run develop
    ```

    Becaus of Gatsby there's a lot more printed out, and more going on in the background. This should be fine, but may mean that deleting or renaming files needs a restart (i.e. CTRL+C then `npm run develop` again). Images may only be processed when they're needed so if you make a big change to the slideshow then it could take a few runs through.

    The content is in `/src`

    **Slideshow**
    The files for the slideshow are in `/src/showcase`
    `/src/showcase/main` is the large site images
    `/src/showcase/small` is the small site (portrait) images
    `/src/showcase/meta.yaml` is the data. 
    
    This is an array of entries with `title` and `url` in, there should be one per image. There's nothing intelligent to link the data from here to the images - it's just based off of the file order.


    **Track Record**
    The files for the bio/cv ate in `src/track-record`
    `/src/track-record/_bio.md` is the bio with 4 arguments:
      - _mail:_ the email address
      - _handle:_ the instagram handle
      - _smallBio:_ the bio text for phone (i.e. London, Berlin)
      - _largeBio:_ the bio text for desktop - ideally 1 line

    `/src/track-record/_cv.yaml` is the cv, same format as before. _related_, _priority_, _description_, and _longDescription_ still exist as they were there before, but don't do anything anymore.

    `/src/track-record/**.[jpg|png]` all the image files should be placed straight in here and referenced in `_cv.yaml` by their full filename and extension.

3.  **Viewing**

    The site runs at http://localhost:8000. 

4.  **Pushing**

    Pushing changes up will trigger netlify's build as before. If a change doesn't appear it may be that the build stage is crashing. You can check this locally by running 

    ```shell
    npm run build
    ```

    and then 

     ```shell
    npm run serve
    ```

    to either see the errors in the terminal, or view the built site at http://localhost:9000. 