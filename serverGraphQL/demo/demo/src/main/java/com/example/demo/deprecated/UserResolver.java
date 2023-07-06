//package com.example.demo.deprecated;
// // package com.example.demo.resolver;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.stereotype.Component;

// // import com.example.demo.model.Author;
// // import com.example.demo.model.Tutorial;
// // import com.example.demo.repository.AuthorRepository;
// // import com.coxautodev.graphql.tools.GraphQLResolver;

// // @Component
// // public class UserResolver implements GraphQLResolver<Tutorial> {
// //   @Autowired
// //   private AuthorRepository authorRepository;

// //   public UserResolver(AuthorRepository authorRepository) {
// //     this.authorRepository = authorRepository;
// //   }

// //   public Author getAuthor(Tutorial tutorial) {
// //     return authorRepository.findById(tutorial.getAuthorId()).orElseThrow(null);
// //   }
// // }


// //---------

// package com.example.demo.resolver;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;
// import com.coxautodev.graphql.tools.GraphQLResolver;

// import com.example.demo.model.User;
// import com.example.demo.repository.UserRepository;

// @Component
// public class UserResolver implements GraphQLResolver<User> {
//   private UserRepository userRepository;

//   @Autowired
//   public UserResolver(UserRepository userRepository) {
//     this.userRepository = userRepository;
//   }



//   public User getUser(User user) {
//     return userRepository.findById(user.getId()).orElseThrow(null);
//   }

// }
