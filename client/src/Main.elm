module Main exposing (..)

import Browser
import Html exposing (Html, p, text, div, img, h1, h2)
import Html.Attributes exposing (src)
import Task

main =
  Browser.document
    { init = \() -> (initialModel , Cmd.none)
    , update = update
    , view = view
    , subscriptions = \_ -> Sub.none
    }

type alias Model =
  { artists : List Artist
  }

type alias Artist =
  { id : Int
  , name : String
  , photo : String
  }

type Msg
  = NoMsg

initialModel : Model
initialModel =
  { artists =
    [ { id = 1, name = "AC/DC", photo = "https://i1.sndcdn.com/avatars-hyJEwQzyBwczTEfs-UmFlag-t500x500.jpg" }
    , { id = 2, name = "Foo Fighters", photo = "https://veja.abril.com.br/wp-content/uploads/2021/02/FOOFIGHTERS-PRESS-SONY-MUSIC-1.jpg.jpg?quality=70&strip=info&w=680&h=453&crop=1" }
    ]
  }

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoMsg -> (model, Cmd.none)

view : Model -> Browser.Document Msg
view model =
  { title = "Music Library"
  , body = viewBody model
  }

viewBody : Model -> List (Html Msg)
viewBody model =
  [ h1 [] [ text "Music Library" ]
  , h2 [] [ text "Artists" ]
  , div [] (List.map viewArtist model.artists)
  ]

viewArtist : Artist -> Html Msg
viewArtist artist =
  div []
  [ p [] [text ("Name: " ++ artist.name)]
  , img [ src artist.photo ] []
  ]




