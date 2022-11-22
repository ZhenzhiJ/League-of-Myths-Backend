# /users/register

## Body

- Method POST
- Username
- Password
- Email

## Response

- User correctly registered
- Could not register user

# /users/login

## Body

- Method POST
- Username
- Password

## Response

- Login successful
- Wrong credentials

# /champions/champion

## Body

- Method GET
- Champion name
- Champion lane
- Champion passive
- Champion ability Q
- Champion ability W
- Champion ability E
- Champion ultimate R

## Response

- Champion loaded correctly
- Failed to connect database
- Failed to load champion

# /champions/create

## Body

- Method POST
- User id
- New champion name
- Selected lane for the champion
- New champion passive
- New champion ability Q
- New champion ability W
- New champion ability E
- New champion ultimate R

## Response

- Champion created correctly
- Could not create champion

# /champions/delete

## Body

- Method DELETE
- Champion id to delete
- User id

## Response

- Succesfully deleted selected champion
- Could not delete selected champion
- Champion does not exist

# /champions/edit

## Body

- Method PUT
- Champion id to edit
- Edited information of the champion

## Response

- New data uploaded
- Failed to edit champion
